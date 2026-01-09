import { useState } from "react"; 
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { CalendarIcon, Clock, MapPin, CheckCircle2, ArrowLeft, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";

interface Therapist {
  id: number;
  name: string;
  specialty: string;
  location: string;
  price: string;
  image: string;
}

interface BookingModalProps {
  therapist: Therapist | null;
  isOpen: boolean;
  onClose: () => void;
}

const timeSlots = [
  "9:00 AM", "10:00 AM", "11:00 AM",
  "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM"
];

type BookingStep = "date" | "time" | "confirm" | "success";

const BookingModal = ({ therapist, isOpen, onClose }: BookingModalProps) => {
  const [step, setStep] = useState<BookingStep>("date");
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [notes, setNotes] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuth();

  const resetAndClose = () => {
    setStep("date");
    setSelectedDate(undefined);
    setSelectedTime("");
    setNotes("");
    onClose();
  };

  const handleConfirmBooking = async () => {
    if (!user || !therapist || !selectedDate || !selectedTime) return;

    setIsLoading(true);

    const { error } = await supabase.from("bookings").insert({
      user_id: user.id,
      therapist_name: therapist.name,
      therapy_type: therapist.specialty,
      booking_date: format(selectedDate, "yyyy-MM-dd"),
      booking_time: selectedTime,
      price: therapist.price,
      notes: notes || null,
      status: "confirmed",
    });

    setIsLoading(false);

    if (error) {
      toast({
        title: "Booking Failed",
        description: "Unable to complete your booking. Please try again.",
        variant: "destructive",
      });
      return;
    }

    setStep("success");
  };

  if (!therapist) return null;

  return (
    <Dialog open={isOpen} onOpenChange={resetAndClose}>
      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-display text-xl">
            {step === "success" ? "Booking Confirmed!" : `Book with ${therapist.name}`}
          </DialogTitle>
        </DialogHeader>

        {/* Therapist Info */}
        {step !== "success" && (
          <div className="flex items-center gap-4 p-4 bg-muted/50 rounded-xl mb-4">
            <img
              src={therapist.image}
              alt={therapist.name}
              className="w-16 h-16 rounded-lg object-cover"
            />
            <div>
              <h4 className="font-semibold text-foreground">{therapist.name}</h4>
              <p className="text-sm text-primary">{therapist.specialty}</p>
              <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
                <MapPin className="w-3 h-3" />
                {therapist.location}
              </div>
            </div>
            <div className="ml-auto text-right">
              <span className="font-semibold text-foreground">{therapist.price}</span>
            </div>
          </div>
        )}

        {/* Step 1: Select Date */}
        {step === "date" && (
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-sm font-medium text-foreground">
              <CalendarIcon className="w-4 h-4 text-primary" />
              Select Date
            </div>
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              disabled={(date) => date < new Date() || date.getDay() === 0}
              className={cn("rounded-xl border p-3 pointer-events-auto")}
            />
            <Button
              variant="wellness"
              className="w-full"
              disabled={!selectedDate}
              onClick={() => setStep("time")}
            >
              Continue
            </Button>
          </div>
        )}

        {/* Step 2: Select Time */}
        {step === "time" && (
          <div className="space-y-4">
            <button
              onClick={() => setStep("date")}
              className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to date
            </button>

            <div className="flex items-center gap-2 text-sm font-medium text-foreground">
              <Clock className="w-4 h-4 text-primary" />
              Select Time for {selectedDate && format(selectedDate, "MMMM d, yyyy")}
            </div>

            <div className="grid grid-cols-4 gap-2">
              {timeSlots.map((time) => (
                <button
                  key={time}
                  onClick={() => setSelectedTime(time)}
                  className={cn(
                    "py-3 px-2 rounded-lg text-sm font-medium transition-all",
                    selectedTime === time
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted hover:bg-muted/80 text-foreground"
                  )}
                >
                  {time}
                </button>
              ))}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">
                Notes (optional)
              </label>
              <Textarea
                placeholder="Any specific concerns or requests..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="resize-none"
                rows={3}
              />
            </div>

            <Button
              variant="wellness"
              className="w-full"
              disabled={!selectedTime}
              onClick={() => setStep("confirm")}
            >
              Review Booking
            </Button>
          </div>
        )}

        {/* Step 3: Confirm */}
        {step === "confirm" && (
          <div className="space-y-4">
            <button
              onClick={() => setStep("time")}
              className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to time
            </button>

            <div className="bg-muted/50 rounded-xl p-4 space-y-3">
              <h4 className="font-medium text-foreground">Booking Summary</h4>
              
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Therapist</span>
                  <span className="font-medium text-foreground">{therapist.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Service</span>
                  <span className="font-medium text-foreground">{therapist.specialty}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Date</span>
                  <span className="font-medium text-foreground">
                    {selectedDate && format(selectedDate, "MMMM d, yyyy")}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Time</span>
                  <span className="font-medium text-foreground">{selectedTime}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Location</span>
                  <span className="font-medium text-foreground">{therapist.location}</span>
                </div>
                {notes && (
                  <div className="pt-2 border-t border-border">
                    <span className="text-muted-foreground">Notes:</span>
                    <p className="text-foreground mt-1">{notes}</p>
                  </div>
                )}
              </div>

              <div className="flex justify-between pt-3 border-t border-border">
                <span className="font-semibold text-foreground">Total</span>
                <span className="font-semibold text-primary">{therapist.price}</span>
              </div>
            </div>

            <Button
              variant="wellness"
              className="w-full"
              onClick={handleConfirmBooking}
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin mr-2" />
                  Confirming...
                </>
              ) : (
                "Confirm Booking"
              )}
            </Button>
          </div>
        )}

        {/* Step 4: Success */}
        {step === "success" && (
          <div className="text-center py-6 space-y-4">
            <div className="w-20 h-20 rounded-full bg-emerald-100 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10 text-emerald-600" />
            </div>

            <div>
              <h3 className="font-display text-xl font-semibold text-foreground">
                Booking Confirmed!
              </h3>
              <p className="text-muted-foreground mt-2">
                Your session with {therapist.name} has been scheduled.
              </p>
            </div>

            <div className="bg-muted/50 rounded-xl p-4 text-left space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Date</span>
                <span className="font-medium text-foreground">
                  {selectedDate && format(selectedDate, "MMMM d, yyyy")}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Time</span>
                <span className="font-medium text-foreground">{selectedTime}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Location</span>
                <span className="font-medium text-foreground">{therapist.location}</span>
              </div>
            </div>

            <Button variant="wellness" className="w-full" onClick={resetAndClose}>
              Done
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default BookingModal;
