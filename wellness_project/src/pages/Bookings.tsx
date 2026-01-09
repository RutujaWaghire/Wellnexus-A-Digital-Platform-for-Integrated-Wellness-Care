import { useState, useEffect } from "react"; 
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Calendar, Clock, MapPin, LogOut, Leaf, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { format } from "date-fns";

interface Booking {
  id: string;
  therapist_name: string;
  therapy_type: string;
  booking_date: string;
  booking_time: string;
  price: string;
  status: string;
  notes: string | null;
  created_at: string;
}

const Bookings = () => {
  const { user, signOut } = useAuth();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      const { data, error } = await supabase
        .from("bookings")
        .select("*")
        .order("booking_date", { ascending: true });

      if (!error && data) {
        setBookings(data);
      }
      setIsLoading(false);
    };

    fetchBookings();
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-emerald-100 text-emerald-700";
      case "pending":
        return "bg-amber-100 text-amber-700";
      case "cancelled":
        return "bg-red-100 text-red-700";
      case "completed":
        return "bg-blue-100 text-blue-700";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
              <Leaf className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="font-display text-xl font-bold text-foreground">Wellnexus </span>
          </Link>
          
          <nav className="hidden md:flex items-center gap-8">
            <Link to="/dashboard" className="text-muted-foreground hover:text-foreground transition-colors">Dashboard</Link>
            <Link to="/therapists" className="text-muted-foreground hover:text-foreground transition-colors">Therapists</Link>
            <Link to="/bookings" className="text-primary font-medium">Bookings</Link>
            <Link to="/#products" className="text-muted-foreground hover:text-foreground transition-colors">Products</Link>
            <Link to="/#qa" className="text-muted-foreground hover:text-foreground transition-colors">Q&A</Link>
          </nav>

          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground hidden md:block">{user?.email}</span>
            <Button variant="outline" size="sm" onClick={signOut}>
              <LogOut className="w-4 h-4 mr-2" />
              Sign Out
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="font-display text-3xl font-bold text-foreground mb-2">
            My Bookings
          </h1>
          <p className="text-muted-foreground">View and manage your wellness appointments</p>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        ) : bookings.length === 0 ? (
          <Card className="text-center py-12">
            <CardContent>
              <Calendar className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="font-display text-xl font-semibold text-foreground mb-2">
                No Bookings Yet
              </h3>
              <p className="text-muted-foreground mb-6">
                Start your wellness journey by booking a session with one of our therapists.
              </p>
              <Link to="/therapists">
                <Button variant="wellness">Find Therapists</Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {bookings.map((booking) => (
              <Card key={booking.id} className="hover:shadow-soft transition-shadow">
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="space-y-2">
                      <div className="flex items-center gap-3">
                        <h3 className="font-display text-lg font-semibold text-foreground">
                          {booking.therapist_name}
                        </h3>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${getStatusColor(booking.status)}`}>
                          {booking.status}
                        </span>
                      </div>
                      <p className="text-sm text-primary font-medium">{booking.therapy_type}</p>
                      
                      <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {format(new Date(booking.booking_date), "MMMM d, yyyy")}
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {booking.booking_time}
                        </div>
                      </div>

                      {booking.notes && (
                        <p className="text-sm text-muted-foreground italic">
                          "{booking.notes}"
                        </p>
                      )}
                    </div>

                    <div className="flex items-center gap-4">
                      <span className="font-semibold text-foreground">{booking.price}</span>
                      {booking.status === "confirmed" && (
                        <Button variant="outline" size="sm">
                          Reschedule
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default Bookings;
