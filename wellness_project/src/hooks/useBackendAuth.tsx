import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { authApi, tokenService } from "@/lib/api-client";

interface User {
  id: string;
  email: string;
  fullName: string;
  role: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ error: Error | null }>;
  signUp: (email: string, password: string, fullName: string, role: string) => Promise<{ error: Error | null }>;
  signOut: () => Promise<void>;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Helper to decode JWT token (basic implementation)
const decodeJWT = (token: string): any => {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    return JSON.parse(jsonPayload);
  } catch (error) {
    console.error('Error decoding JWT:', error);
    return null;
  }
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for existing token on mount
    const token = tokenService.getToken();
    if (token) {
      const decoded = decodeJWT(token);
      if (decoded) {
        // Extract user info from JWT payload
        setUser({
          id: decoded.userId?.toString() || '',
          email: decoded.sub || '',
          fullName: decoded.name || '',
          role: decoded.role || 'USER',
        });
      }
    }
    setLoading(false);
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      const token = await authApi.login(email, password);
      tokenService.setToken(token);
      
      const decoded = decodeJWT(token);
      if (decoded) {
        setUser({
          id: decoded.userId?.toString() || '',
          email: decoded.sub || '',
          fullName: decoded.name || '',
          role: decoded.role || 'USER',
        });
      }
      
      return { error: null };
    } catch (error) {
      return { error: error as Error };
    }
  };

  const signUp = async (email: string, password: string, fullName: string, role: string) => {
    try {
      await authApi.register(email, password, fullName, role);
      
      // After registration, automatically log in
      return await signIn(email, password);
    } catch (error) {
      return { error: error as Error };
    }
  };

  const signOut = async () => {
    tokenService.removeToken();
    setUser(null);
  };

  return (
    <AuthContext.Provider 
      value={{ 
        user, 
        loading, 
        signIn, 
        signUp, 
        signOut,
        isAuthenticated: !!user 
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
