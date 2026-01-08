import { useState, useEffect } from "react"; 
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import AuthHero from "@/components/auth/AuthHero";
import LoginForm from "@/components/auth/LoginForm";
import RegisterForm from "@/components/auth/RegisterForm";
import ForgotPasswordForm from "@/components/auth/ForgotPasswordForm";

type AuthView = "login" | "register" | "forgot-password";

const Auth = () => {
  const [view, setView] = useState<AuthView>("login");
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  // Redirect if already logged in
  useEffect(() => {
    if (!loading && user) {
      navigate("/dashboard");
    }
  }, [user, loading, navigate]);

  const getTitle = () => {
    switch (view) {
      case "login":
        return "Welcome Back";
      case "register":
        return "Create Account";
      case "forgot-password":
        return "Reset Password";
    }
  };

  const getSubtitle = () => {
    switch (view) {
      case "login":
        return "Sign in to continue your Wellnexus journey";
      case "register":
        return "Join our community of Wellnexus seekers";
      case "forgot-password":
        return "We'll help you get back on track";
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Hero Section */}
      <div className="hidden lg:block lg:w-1/2 xl:w-3/5">
        <AuthHero />
      </div>

      {/* Right Side - Auth Forms */}
      <div className="w-full lg:w-1/2 xl:w-2/5 flex items-center justify-center p-6 lg:p-12 bg-card">
        <div className="w-full max-w-md">
          {/* Mobile Logo */}
          <div className="lg:hidden flex items-center justify-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
              <svg className="w-5 h-5 text-primary-foreground" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 2a9 9 0 0 0-9 9c0 3.5 2 6.5 5 8.5V22l3-2 3 2v-2.5c3-2 5-5 5-8.5a9 9 0 0 0-9-9z" />
              </svg>
            </div>
            <span className="font-display text-xl font-bold text-foreground">Wellnexus</span>
          </div>

          {/* Header */}
          {view !== "forgot-password" && (
            <div className="text-center mb-8 animate-fade-in">
              <h2 className="font-display text-3xl font-bold text-foreground mb-2">
                {getTitle()}
              </h2>
              <p className="text-muted-foreground">
                {getSubtitle()}
              </p>
            </div>
          )}

          {/* Form Container */}
          <div className="bg-card rounded-2xl p-6 lg:p-8 shadow-soft border border-border animate-scale-in">
            {view === "login" && (
              <LoginForm
                onSwitchToRegister={() => setView("register")}
                onForgotPassword={() => setView("forgot-password")}
              />
            )}
            {view === "register" && (
              <RegisterForm onSwitchToLogin={() => setView("login")} />
            )}
            {view === "forgot-password" && (
              <ForgotPasswordForm onBack={() => setView("login")} />
            )}
          </div>

          {/* Footer */}
          <p className="text-center text-xs text-muted-foreground mt-8">
            By continuing, you agree to our{" "}
            <a href="#" className="text-primary hover:underline">Terms of Service</a>
            {" "}and{" "}
            <a href="#" className="text-primary hover:underline">Privacy Policy</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Auth;
