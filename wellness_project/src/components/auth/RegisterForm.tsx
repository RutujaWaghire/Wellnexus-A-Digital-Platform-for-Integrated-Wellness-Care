import { useState } from "react"; 
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff, Mail, Lock, User, Loader2, Stethoscope, Heart } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";

interface RegisterFormProps {
  onSwitchToLogin: () => void;
}

type UserRole = "patient" | "practitioner";

const RegisterForm = ({ onSwitchToLogin }: RegisterFormProps) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [role, setRole] = useState<UserRole>("patient");
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const { signUp } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name || !email || !password || !confirmPassword) {
      toast({
        title: "Missing Fields",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    if (password !== confirmPassword) {
      toast({
        title: "Password Mismatch",
        description: "Passwords do not match. Please try again.",
        variant: "destructive",
      });
      return;
    }

    if (password.length < 8) {
      toast({
        title: "Weak Password",
        description: "Password must be at least 8 characters long.",
        variant: "destructive",
      });
      return;
    }

    if (!agreedToTerms) {
      toast({
        title: "Terms Required",
        description: "Please agree to the terms and conditions.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    const { error } = await signUp(email, password, name, role);
    
    setIsLoading(false);
    
    if (error) {
      toast({
        title: "Registration Failed",
        description: error.message === "User already registered" 
          ? "An account with this email already exists. Please sign in instead."
          : error.message,
        variant: "destructive",
      });
      return;
    }
    
    toast({
      title: "Account Created!",
      description: "Welcome to Wellnexus! Redirecting to your dashboard...",
    });
    navigate("/dashboard");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Role Selection */}
      <div className="space-y-3">
        <Label>I am a</Label>
        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => setRole("patient")}
            className={`p-4 rounded-xl border-2 transition-all duration-300 flex flex-col items-center gap-2 ${
              role === "patient"
                ? "border-primary bg-sage-light"
                : "border-border hover:border-primary/50"
            }`}
          >
            <Heart className={`h-6 w-6 ${role === "patient" ? "text-primary" : "text-muted-foreground"}`} />
            <span className={`text-sm font-medium ${role === "patient" ? "text-primary" : "text-muted-foreground"}`}>
              Patient
            </span>
          </button>
          <button
            type="button"
            onClick={() => setRole("practitioner")}
            className={`p-4 rounded-xl border-2 transition-all duration-300 flex flex-col items-center gap-2 ${
              role === "practitioner"
                ? "border-primary bg-sage-light"
                : "border-border hover:border-primary/50"
            }`}
          >
            <Stethoscope className={`h-6 w-6 ${role === "practitioner" ? "text-primary" : "text-muted-foreground"}`} />
            <span className={`text-sm font-medium ${role === "practitioner" ? "text-primary" : "text-muted-foreground"}`}>
              Practitioner
            </span>
          </button>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="name">Full Name</Label>
        <div className="relative">
          <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            id="name"
            type="text"
            placeholder="John Doe"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="pl-10"
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="register-email">Email Address</Label>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            id="register-email"
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="pl-10"
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="register-password">Password</Label>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            id="register-password"
            type={showPassword ? "text" : "password"}
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="pl-10 pr-10"
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
          >
            {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
          </button>
        </div>
        <p className="text-xs text-muted-foreground">Must be at least 8 characters</p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="confirm-password">Confirm Password</Label>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            id="confirm-password"
            type={showConfirmPassword ? "text" : "password"}
            placeholder="••••••••"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="pl-10 pr-10"
            required
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
          >
            {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <label className="flex items-start gap-3 cursor-pointer">
        <input
          type="checkbox"
          checked={agreedToTerms}
          onChange={(e) => setAgreedToTerms(e.target.checked)}
          className="w-4 h-4 mt-0.5 rounded border-input text-primary focus:ring-primary/20"
        />
        <span className="text-sm text-muted-foreground">
          I agree to the{" "}
          <a href="#" className="text-primary hover:underline">Terms of Service</a>
          {" "}and{" "}
          <a href="#" className="text-primary hover:underline">Privacy Policy</a>
        </span>
      </label>

      <Button type="submit" variant="wellness" size="lg" className="w-full" disabled={isLoading}>
        {isLoading ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Creating account...
          </>
        ) : (
          `Create ${role === "practitioner" ? "Practitioner" : "Patient"} Account`
        )}
      </Button>

      <p className="text-center text-sm text-muted-foreground mt-4">
        Already have an account?{" "}
        <button
          type="button"
          onClick={onSwitchToLogin}
          className="text-primary hover:text-primary/80 font-semibold transition-colors"
        >
          Sign in
        </button>
      </p>
    </form>
  );
};

export default RegisterForm;
