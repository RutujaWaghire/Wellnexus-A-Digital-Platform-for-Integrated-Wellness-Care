import { Button } from "@/components/ui/button"; 
import { Leaf, ArrowRight, Star, Shield, Calendar, Users, Sparkles, Heart, LogOut, User } from "lucide-react";
import { Link } from "react-router-dom";
import wellnessHero from "@/assets/wellness-hero.jpg";
import wellnessMeditation from "@/assets/wellness-meditation.jpg";
import wellnessOils from "@/assets/wellness-oils.jpg";
import wellnessAcupuncture from "@/assets/wellness-acupuncture.jpg";
import wellnessHerbs from "@/assets/wellness-herbs.jpg";
import ProductsSection from "@/components/ProductsSection";
import QASection from "@/components/QASection";
import ReviewsSection from "@/components/ReviewsSection";
import { useAuth } from "@/hooks/useAuth";

const features = [
  {
    icon: Shield,
    title: "Verified Practitioners",
    description: "All therapists are certified and background-checked for your safety.",
  },
  {
    icon: Calendar,
    title: "Easy Booking",
    description: "Book sessions in seconds with our intuitive scheduling system.",
  },
  {
    icon: Users,
    title: "Community Support",
    description: "Connect with others on similar wellness journeys.",
  },
  {
    icon: Sparkles,
    title: "AI Recommendations",
    description: "Get personalized therapy suggestions based on your needs.",
  },
];

const therapies = [
  { name: "Physiotherapy", icon: "🏃", image: wellnessHero },
  { name: "Acupuncture", icon: "🎯", image: wellnessAcupuncture },
  { name: "Ayurveda", icon: "🌿", image: wellnessHerbs },
  { name: "Yoga & Meditation", icon: "🧘", image: wellnessMeditation },
  { name: "Aromatherapy", icon: "💆", image: wellnessOils },
  { name: "Naturopathy", icon: "🌱", image: wellnessHero },
];

const Index = () => {
  const { user, signOut } = useAuth();

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
                <Leaf className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="font-display text-xl font-bold text-foreground">Wellnexus</span>
            </div>
            <div className="hidden md:flex items-center gap-8">
              <a href="#therapies" className="text-muted-foreground hover:text-foreground transition-colors text-sm font-medium">
                Therapies
              </a>
              <a href="#products" className="text-muted-foreground hover:text-foreground transition-colors text-sm font-medium">
                Products
              </a>
              <a href="#qa" className="text-muted-foreground hover:text-foreground transition-colors text-sm font-medium">
                Q&A
              </a>
              <a href="#reviews" className="text-muted-foreground hover:text-foreground transition-colors text-sm font-medium">
                Reviews
              </a>
            </div>
            <div className="flex items-center gap-3">
              {user ? (
                <>
                  <Link to="/dashboard">
                    <Button variant="ghost" size="sm" className="flex items-center gap-2">
                      <User className="h-4 w-4" />
                      {user.user_metadata?.full_name || user.email?.split('@')[0]}
                    </Button>
                  </Link>
                  <Button variant="outline" size="sm" onClick={signOut} className="flex items-center gap-2">
                    <LogOut className="h-4 w-4" />
                    Sign Out
                  </Button>
                </>
              ) : (
                <>
                  <Link to="/auth">
                    <Button variant="ghost" size="sm">Sign In</Button>
                  </Link>
                  <Link to="/auth">
                    <Button variant="wellness" size="sm">Get Started</Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-24 pb-12 lg:pt-32 lg:pb-20 overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 gradient-hero" />
        
        {/* Floating Elements */}
        <div className="absolute top-32 left-10 animate-float hidden lg:block">
          <div className="w-14 h-14 rounded-full bg-sage-light flex items-center justify-center blob">
            <Leaf className="h-6 w-6 text-primary" />
          </div>
        </div>
        <div className="absolute top-60 right-20 animate-float delay-300 hidden lg:block">
          <div className="w-10 h-10 rounded-full bg-terracotta-light flex items-center justify-center">
            <Heart className="h-5 w-5 text-accent" />
          </div>
        </div>

        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="max-w-xl">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-sage-light rounded-full mb-6 animate-fade-in">
                <Star className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium text-primary">Trusted by 10,000+ wellness seekers</span>
              </div>
              
              <h1 className="font-display text-4xl lg:text-5xl xl:text-6xl font-bold text-foreground leading-tight mb-6 animate-fade-in delay-100">
                Discover Your Path to
                <span className="block text-primary">Holistic Wellness</span>
              </h1>
              
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed animate-fade-in delay-200">
                Connect with certified practitioners, book therapy sessions, and find products for your complete mind-body wellness journey.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 animate-fade-in delay-300">
                <Link to="/auth">
                  <Button variant="hero" size="xl">
                    Start Your Journey
                    <ArrowRight className="h-5 w-5 ml-2" />
                  </Button>
                </Link>
                <Button variant="outline" size="xl">
                  Explore Therapies
                </Button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-6 mt-12 pt-8 border-t border-border animate-fade-in delay-400">
                <div>
                  <p className="font-display text-3xl lg:text-4xl font-bold text-primary">500+</p>
                  <p className="text-sm text-muted-foreground">Verified Practitioners</p>
                </div>
                <div>
                  <p className="font-display text-3xl lg:text-4xl font-bold text-primary">50k+</p>
                  <p className="text-sm text-muted-foreground">Sessions Booked</p>
                </div>
                <div>
                  <p className="font-display text-3xl lg:text-4xl font-bold text-primary">4.9</p>
                  <p className="text-sm text-muted-foreground">Average Rating</p>
                </div>
              </div>
            </div>

            {/* Right - Image Collage */}
            <div className="relative hidden lg:block">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div className="rounded-3xl overflow-hidden shadow-medium h-48 animate-fade-in delay-100">
                    <img src={wellnessMeditation} alt="Meditation" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                  </div>
                  <div className="rounded-3xl overflow-hidden shadow-medium h-64 animate-fade-in delay-200">
                    <img src={wellnessOils} alt="Aromatherapy" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                  </div>
                </div>
                <div className="space-y-4 pt-8">
                  <div className="rounded-3xl overflow-hidden shadow-medium h-64 animate-fade-in delay-300">
                    <img src={wellnessAcupuncture} alt="Acupuncture" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                  </div>
                  <div className="rounded-3xl overflow-hidden shadow-medium h-48 animate-fade-in delay-400">
                    <img src={wellnessHerbs} alt="Herbal remedies" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                  </div>
                </div>
              </div>
              {/* Floating Card */}
              <div className="absolute -bottom-4 -left-4 bg-card p-4 rounded-2xl shadow-medium border border-border max-w-[200px] animate-float">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 rounded-full bg-sage-light flex items-center justify-center">
                    <Star className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold text-sm text-foreground">Top Rated</p>
                    <p className="text-xs text-muted-foreground">This week</p>
                  </div>
                </div>
                <div className="flex items-center gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-3 w-3 fill-accent text-accent" />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Therapies Section */}
      <section id="therapies" className="py-20 lg:py-28 bg-secondary/30">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Explore Alternative Therapies
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Discover a wide range of holistic healing practices tailored to your unique needs
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {therapies.map((therapy, index) => (
              <div
                key={therapy.name}
                className="group relative rounded-2xl overflow-hidden shadow-soft hover:shadow-medium transition-all duration-300 cursor-pointer animate-fade-in aspect-[3/4]"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <img 
                  src={therapy.image} 
                  alt={therapy.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <span className="text-2xl mb-1 block">{therapy.icon}</span>
                  <h3 className="font-medium text-primary-foreground text-sm">{therapy.name}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Products Section */}
      <ProductsSection />

      {/* Gallery Section */}
      <section id="gallery" className="py-20 lg:py-28">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Experience True Wellness
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Step into our world of holistic healing and discover the power of alternative therapies
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="col-span-2 row-span-2 rounded-3xl overflow-hidden shadow-medium">
              <img src={wellnessMeditation} alt="Meditation" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
            </div>
            <div className="rounded-3xl overflow-hidden shadow-medium">
              <img src={wellnessOils} alt="Essential oils" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
            </div>
            <div className="rounded-3xl overflow-hidden shadow-medium">
              <img src={wellnessAcupuncture} alt="Acupuncture" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
            </div>
            <div className="rounded-3xl overflow-hidden shadow-medium">
              <img src={wellnessHerbs} alt="Herbal tea" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
            </div>
            <div className="rounded-3xl overflow-hidden shadow-medium">
              <img src={wellnessHero} alt="Zen spa" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 lg:py-28 bg-secondary/30">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="font-display text-3xl lg:text-4xl font-bold text-foreground mb-6">
                Everything You Need for Your Wellness Journey
              </h2>
              <p className="text-muted-foreground mb-8 text-lg">
                Our platform brings together practitioners, products, and community support in one seamless experience.
              </p>
              
              <div className="grid gap-5">
                {features.map((feature, index) => (
                  <div
                    key={feature.title}
                    className="flex gap-4 p-4 rounded-xl bg-card border border-border hover:shadow-soft transition-all animate-fade-in"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="w-12 h-12 rounded-xl bg-sage-light flex items-center justify-center shrink-0">
                      <feature.icon className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">{feature.title}</h3>
                      <p className="text-sm text-muted-foreground">{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="relative">
              <div className="rounded-3xl overflow-hidden shadow-medium">
                <img
                  src={wellnessMeditation}
                  alt="Wellness experience"
                  className="w-full h-auto object-cover"
                />
              </div>
              {/* Floating Stats Card */}
              <div className="absolute -bottom-6 -right-6 bg-card p-6 rounded-2xl shadow-medium border border-border animate-float">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-full bg-primary flex items-center justify-center">
                    <Heart className="h-7 w-7 text-primary-foreground" />
                  </div>
                  <div>
                    <p className="font-display text-2xl font-bold text-foreground">98%</p>
                    <p className="text-sm text-muted-foreground">Satisfaction Rate</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Q&A Section */}
      <QASection />

      {/* Reviews Section */}
      <ReviewsSection />

      {/* CTA Section */}
      <section className="py-20 lg:py-28 bg-primary relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <img src={wellnessHero} alt="" className="w-full h-full object-cover" />
        </div>
        <div className="container mx-auto px-4 lg:px-8 text-center relative z-10">
          <h2 className="font-display text-3xl lg:text-4xl font-bold text-primary-foreground mb-6">
            Ready to Begin Your Wellness Journey?
          </h2>
          <p className="text-primary-foreground/80 mb-8 max-w-xl mx-auto text-lg">
            Join thousands of wellness seekers who have transformed their lives through holistic healing.
          </p>
          <Link to="/auth">
            <Button 
              variant="secondary" 
              size="xl"
              className="bg-card text-primary hover:bg-card/90"
            >
              Get Started Free
              <ArrowRight className="h-5 w-5 ml-2" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-border">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                <Leaf className="h-4 w-4 text-primary-foreground" />
              </div>
              <span className="font-display text-lg font-bold text-foreground">Wellnexus</span>
            </div>
            <p className="text-sm text-muted-foreground">
              © 2026 Wellnexus . All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
