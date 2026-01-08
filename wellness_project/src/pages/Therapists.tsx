import { useState } from "react"; 
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import { Search, Star, MapPin, Clock, Heart, LogOut, Leaf, Filter } from "lucide-react";
import wellnessMeditation from "@/assets/wellness-meditation.jpg";
import wellnessOils from "@/assets/wellness-oils.jpg";
import wellnessAcupuncture from "@/assets/wellness-acupuncture.jpg";
import wellnessHerbs from "@/assets/wellness-herbs.jpg";
import BookingModal from "@/components/BookingModal";

interface Therapist {
  id: number;
  name: string;
  specialty: string;
  rating: number;
  reviews: number;
  location: string;
  experience: string;
  price: string;
  image: string;
  available: boolean;
}

const Therapists = () => {
  const { user, signOut } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTherapist, setSelectedTherapist] = useState<Therapist | null>(null);
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  const handleBookNow = (therapist: Therapist) => {
    setSelectedTherapist(therapist);
    setIsBookingOpen(true);
  };

  const therapists = [
    {
      id: 1,
      name: "Dr. Sarah Chen",
      specialty: "Acupuncture & TCM",
      rating: 4.9,
      reviews: 127,
      location: "Downtown Wellness Center",
      experience: "15 years",
      price: "$120/session",
      image: wellnessAcupuncture,
      available: true,
    },
    {
      id: 2,
      name: "Maya Johnson",
      specialty: "Aromatherapy & Massage",
      rating: 4.8,
      reviews: 89,
      location: "Serenity Spa",
      experience: "8 years",
      price: "$95/session",
      image: wellnessOils,
      available: true,
    },
    {
      id: 3,
      name: "Dr. James Wilson",
      specialty: "Meditation & Mindfulness",
      rating: 4.9,
      reviews: 203,
      location: "Zen Garden Studio",
      experience: "20 years",
      price: "$85/session",
      image: wellnessMeditation,
      available: false,
    },
    {
      id: 4,
      name: "Elena Rodriguez",
      specialty: "Herbal Medicine",
      rating: 4.7,
      reviews: 64,
      location: "Natural Healing Center",
      experience: "12 years",
      price: "$110/session",
      image: wellnessHerbs,
      available: true,
    },
    {
      id: 5,
      name: "Dr. Michael Park",
      specialty: "Reiki & Energy Healing",
      rating: 4.8,
      reviews: 156,
      location: "Harmony Wellness",
      experience: "10 years",
      price: "$100/session",
      image: wellnessMeditation,
      available: true,
    },
    {
      id: 6,
      name: "Lisa Thompson",
      specialty: "Yoga Therapy",
      rating: 4.9,
      reviews: 178,
      location: "Lotus Yoga Studio",
      experience: "14 years",
      price: "$75/session",
      image: wellnessOils,
      available: true,
    },
  ];

  const filteredTherapists = therapists.filter(t =>
    t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    t.specialty.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
            <Link to="/therapists" className="text-primary font-medium">Therapists</Link>
            <Link to="/bookings" className="text-muted-foreground hover:text-foreground transition-colors">Bookings</Link>
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
            Find Your Therapist
          </h1>
          <p className="text-muted-foreground">Discover certified practitioners for your wellness journey</p>
        </div>

        {/* Search & Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              placeholder="Search by name or specialty..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 h-12"
            />
          </div>
          <Button variant="outline" className="h-12">
            <Filter className="w-4 h-4 mr-2" />
            Filters
          </Button>
        </div>

        {/* Therapists Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTherapists.map((therapist) => (
            <Card key={therapist.id} className="overflow-hidden hover:shadow-soft transition-all group">
              <div className="relative">
                <img
                  src={therapist.image}
                  alt={therapist.name}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <button className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center hover:bg-white transition-colors">
                  <Heart className="w-5 h-5 text-muted-foreground hover:text-rose-500 transition-colors" />
                </button>
                {therapist.available ? (
                  <span className="absolute bottom-4 left-4 px-3 py-1 rounded-full bg-emerald-500 text-white text-xs font-medium">
                    Available Today
                  </span>
                ) : (
                  <span className="absolute bottom-4 left-4 px-3 py-1 rounded-full bg-muted text-muted-foreground text-xs font-medium">
                    Next: Tomorrow
                  </span>
                )}
              </div>
              <CardContent className="p-5">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-display text-lg font-semibold text-foreground">{therapist.name}</h3>
                    <p className="text-sm text-primary font-medium">{therapist.specialty}</p>
                  </div>
                  <div className="flex items-center gap-1 bg-amber-50 px-2 py-1 rounded-lg">
                    <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                    <span className="text-sm font-semibold text-amber-700">{therapist.rating}</span>
                  </div>
                </div>
                
                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPin className="w-4 h-4" />
                    {therapist.location}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="w-4 h-4" />
                    {therapist.experience} experience
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-border">
                  <span className="font-semibold text-foreground">{therapist.price}</span>
                  <Button variant="wellness" size="sm" onClick={() => handleBookNow(therapist)}>
                    Book Now
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>

      <BookingModal
        therapist={selectedTherapist}
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
      />
    </div>
  );
};

export default Therapists;
