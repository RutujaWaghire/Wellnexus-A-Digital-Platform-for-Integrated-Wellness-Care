import { useAuth } from "@/hooks/useAuth"; 
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Calendar, Users, Heart, Star, LogOut, Leaf, Clock, TrendingUp } from "lucide-react";
import wellnessHero from "@/assets/wellness-hero.jpg";
import wellnessMeditation from "@/assets/wellness-meditation.jpg";
import wellnessOils from "@/assets/wellness-oils.jpg";

const Dashboard = () => {
  const { user, signOut } = useAuth();

  const stats = [
    { label: "Upcoming Sessions", value: "3", icon: Calendar, color: "text-primary" },
    { label: "Favorite Therapists", value: "7", icon: Heart, color: "text-rose-500" },
    { label: "Total Sessions", value: "24", icon: Clock, color: "text-amber-500" },
    { label: "Wellness Score", value: "85%", icon: TrendingUp, color: "text-emerald-500" },
  ];

  const upcomingSessions = [
    { therapist: "Dr. Sarah Chen", therapy: "Acupuncture", date: "Dec 15, 2024", time: "10:00 AM", image: wellnessMeditation },
    { therapist: "Maya Johnson", therapy: "Aromatherapy", date: "Dec 18, 2024", time: "2:00 PM", image: wellnessOils },
    { therapist: "Dr. James Wilson", therapy: "Meditation", date: "Dec 20, 2024", time: "9:00 AM", image: wellnessHero },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
              <Leaf className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="font-display text-xl font-bold text-foreground">WellnessHub</span>
          </Link>
          
          <nav className="hidden md:flex items-center gap-8">
            <Link to="/dashboard" className="text-primary font-medium">Dashboard</Link>
            <Link to="/therapists" className="text-muted-foreground hover:text-foreground transition-colors">Therapists</Link>
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
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="font-display text-3xl font-bold text-foreground mb-2">
            Welcome back! 🌿
          </h1>
          <p className="text-muted-foreground">Your wellness journey continues. Here's what's happening today.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, index) => (
            <Card key={index} className="bg-card hover:shadow-soft transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <stat.icon className={`w-6 h-6 ${stat.color}`} />
                </div>
                <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Upcoming Sessions */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="font-display">Upcoming Sessions</CardTitle>
                <CardDescription>Your scheduled wellness appointments</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {upcomingSessions.map((session, index) => (
                  <div key={index} className="flex items-center gap-4 p-4 rounded-xl bg-muted/50 hover:bg-muted transition-colors">
                    <img 
                      src={session.image} 
                      alt={session.therapy}
                      className="w-16 h-16 rounded-lg object-cover"
                    />
                    <div className="flex-1">
                      <h4 className="font-semibold text-foreground">{session.therapist}</h4>
                      <p className="text-sm text-muted-foreground">{session.therapy}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-foreground">{session.date}</p>
                      <p className="text-sm text-muted-foreground">{session.time}</p>
                    </div>
                  </div>
                ))}
                <Button variant="outline" className="w-full mt-4">View All Bookings</Button>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="font-display">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Link to="/therapists">
                  <Button variant="wellness" className="w-full justify-start">
                    <Users className="w-4 h-4 mr-3" />
                    Find Therapists
                  </Button>
                </Link>
                <Button variant="outline" className="w-full justify-start">
                  <Calendar className="w-4 h-4 mr-3" />
                  Book a Session
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Star className="w-4 h-4 mr-3" />
                  Leave a Review
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-primary/10 to-accent/10 border-primary/20">
              <CardContent className="p-6 text-center">
                <Leaf className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="font-display text-lg font-semibold mb-2">Premium Membership</h3>
                <p className="text-sm text-muted-foreground mb-4">Unlock exclusive therapies and discounts</p>
                <Button variant="wellness" size="sm">Upgrade Now</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
