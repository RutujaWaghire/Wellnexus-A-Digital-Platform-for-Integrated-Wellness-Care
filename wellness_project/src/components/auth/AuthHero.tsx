import { Leaf, Sparkles, Heart, Star } from "lucide-react"; 
import wellnessHero from "@/assets/wellness-hero.jpg";
import wellnessMeditation from "@/assets/wellness-meditation.jpg";
import wellnessOils from "@/assets/wellness-oils.jpg";
import wellnessAcupuncture from "@/assets/wellness-acupuncture.jpg";
import wellnessHerbs from "@/assets/wellness-herbs.jpg";

const therapies = [
  "Physiotherapy",
  "Acupuncture", 
  "Ayurveda",
  "Chiropractic",
  "Massage Therapy",
  "Naturopathy",
];

const AuthHero = () => {
  return (
    <div className="relative h-full overflow-hidden bg-gradient-to-br from-sage-light via-background to-cream">
      {/* Main Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-sage-light/30" />

      {/* Image Collage */}
      <div className="absolute inset-0 grid grid-cols-2 grid-rows-3 gap-3 p-6 opacity-90">
        {/* Main large image */}
        <div className="row-span-2 rounded-3xl overflow-hidden shadow-medium animate-fade-in">
          <img
            src={wellnessMeditation}
            alt="Meditation and yoga"
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
          />
        </div>
        
        {/* Top right */}
        <div className="rounded-3xl overflow-hidden shadow-medium animate-fade-in delay-100">
          <img
            src={wellnessOils}
            alt="Essential oils and aromatherapy"
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
          />
        </div>
        
        {/* Middle right */}
        <div className="rounded-3xl overflow-hidden shadow-medium animate-fade-in delay-200">
          <img
            src={wellnessAcupuncture}
            alt="Acupuncture therapy"
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
          />
        </div>
        
        {/* Bottom left */}
        <div className="rounded-3xl overflow-hidden shadow-medium animate-fade-in delay-300">
          <img
            src={wellnessHerbs}
            alt="Herbal remedies"
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
          />
        </div>
        
        {/* Bottom right */}
        <div className="rounded-3xl overflow-hidden shadow-medium animate-fade-in delay-400">
          <img
            src={wellnessHero}
            alt="Zen spa"
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
          />
        </div>
      </div>

      {/* Gradient Overlay for text readability */}
      <div className="absolute inset-0 bg-gradient-to-r from-background via-background/95 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-background to-transparent" />

      {/* Floating Decorative Elements */}
      <div className="absolute top-20 right-10 animate-float z-20">
        <div className="w-14 h-14 rounded-full bg-primary/20 backdrop-blur-sm blob flex items-center justify-center shadow-soft">
          <Leaf className="h-7 w-7 text-primary" />
        </div>
      </div>
      <div className="absolute top-1/3 right-1/4 animate-float delay-200 z-20">
        <div className="w-10 h-10 rounded-full bg-accent/20 backdrop-blur-sm flex items-center justify-center shadow-soft">
          <Sparkles className="h-5 w-5 text-accent" />
        </div>
      </div>
      <div className="absolute bottom-1/3 left-1/3 animate-float delay-300 z-20">
        <div className="w-12 h-12 rounded-full bg-sage-light/80 backdrop-blur-sm flex items-center justify-center shadow-soft">
          <Heart className="h-6 w-6 text-primary" />
        </div>
      </div>
      <div className="absolute bottom-1/4 right-1/3 animate-float delay-500 z-20">
        <div className="w-10 h-10 rounded-full bg-terracotta-light/60 backdrop-blur-sm flex items-center justify-center shadow-soft">
          <Star className="h-5 w-5 text-accent" />
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col justify-center px-8 lg:px-12 max-w-lg">
        <div className="animate-fade-in">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center shadow-glow">
              <Leaf className="h-6 w-6 text-primary-foreground" />
            </div>
            <span className="font-display text-2xl font-bold text-foreground">Wellnexus</span>
          </div>
          
          <h1 className="font-display text-4xl lg:text-5xl font-bold text-foreground leading-tight mb-4">
            {/* Your Journey to */}
            <span className="block text-primary">A Digital Platform for Integrated Wellness Care</span>
          </h1>
          
          <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
            Connect with verified practitioners, book therapy sessions, and discover products 
            for your complete wellness journey.
          </p>

          {/* Therapy Tags */}
          <div className="flex flex-wrap gap-2 mb-8">
            {therapies.map((therapy, index) => (
              <span
                key={therapy}
                className="px-3 py-1.5 bg-card/90 backdrop-blur-sm text-sm text-foreground rounded-full border border-border/50 shadow-soft animate-fade-in hover:bg-primary hover:text-primary-foreground transition-colors cursor-pointer"
                style={{ animationDelay: `${index * 100 + 300}ms` }}
              >
                {therapy}
              </span>
            ))}
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 p-4 bg-card/80 backdrop-blur-sm rounded-2xl border border-border/50 shadow-soft">
            <div className="text-center">
              <p className="font-display text-2xl lg:text-3xl font-bold text-primary">500+</p>
              <p className="text-xs text-muted-foreground">Practitioners</p>
            </div>
            <div className="text-center border-x border-border/50">
              <p className="font-display text-2xl lg:text-3xl font-bold text-primary">10k+</p>
              <p className="text-xs text-muted-foreground">Sessions</p>
            </div>
            <div className="text-center">
              <p className="font-display text-2xl lg:text-3xl font-bold text-primary">4.9</p>
              <p className="text-xs text-muted-foreground">Rating</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthHero;
