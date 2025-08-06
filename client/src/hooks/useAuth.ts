import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useVibeStore } from "../stores/vibeStore";

interface AuthUser {
  email: string;
  name: string;
  token?: string;
  isVerified?: boolean;
}

interface RegisterPayload {
  email: string;
  password: string;
  name?: string;
}

interface AuthState {
  user: AuthUser | null;
  isLoading: boolean;
  error: string | null;
}

export function useAuth() {
  const [state, setState] = useState<AuthState>({
    user: null,
    isLoading: false,
    error: null,
  });
  const navigate = useNavigate();
  const { setUser } = useVibeStore();

  // Helper to safely store user data
  const persistUser = (user: AuthUser) => {
    const safeUserData = {
      email: user.email,
      name: user.name,
      token: user.token,
      isVerified: user.isVerified
    };
    localStorage.setItem("user", JSON.stringify(safeUserData));
    setUser(safeUserData);
  };

  // Mock API service
  const authService = {
    register: async (payload: RegisterPayload): Promise<AuthUser> => {
      if (payload.password.length < 8) {
        throw new Error("Password must be at least 8 characters");
      }

      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            email: payload.email,
            name: payload.name || payload.email.split("@")[0],
            isVerified: false // New users aren't verified by default
          });
        }, 1000);
      });
    },

    login: async (email: string, password: string): Promise<AuthUser> => {
      if (!email.includes("@")) throw new Error("Invalid email");
      if (password.length < 8) throw new Error("Invalid password");

      return new Promise((resolve, reject) => {
        setTimeout(() => {
          if (email === "demo@vibecoding.com" && password === "Demo@123") {
            resolve({
              email,
              name: "Demo User",
              token: "mock-jwt-token",
              isVerified: true
            });
          } else {
            reject(new Error("Invalid credentials"));
          }
        }, 1000);
      });
    },

    verifyEmail: async (code: string): Promise<AuthUser> => {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            ...state.user!,
            token: "mock-verified-token",
            isVerified: true
          });
        }, 1000);
      });
    },

    resendVerification: async (email: string): Promise<void> => {
      return new Promise((resolve) => {
        setTimeout(() => resolve(), 500);
      });
    }
  };

  const register = async (email: string, password: string, name?: string) => {
    setState((prev) => ({ ...prev, isLoading: true, error: null }));

    try {
      const user = await authService.register({ email, password, name });
      setState({ user, isLoading: false, error: null });
      persistUser(user);
      navigate("/verify-email"); // Redirect to verification page
    } catch (err) {
      const error = err instanceof Error ? err.message : "Registration failed";
      setState({ user: null, isLoading: false, error });
      throw err;
    }
  };

  const login = async (email: string, password: string) => {
    setState((prev) => ({ ...prev, isLoading: true, error: null }));

    try {
      const user = await authService.login(email, password);
      
      if (!user.isVerified) {
        setState({ user, isLoading: false, error: null });
        navigate("/verify-email");
        return;
      }

      setState({ user, isLoading: false, error: null });
      persistUser(user);
      navigate("/");
    } catch (err) {
      setState({
        user: null,
        isLoading: false,
        error: err instanceof Error ? err.message : "Login failed"
      });
    }
  };

  const verifyEmail = async (code: string) => {
    if (!state.user?.email) throw new Error("No email to verify");
    
    setState((prev) => ({ ...prev, isLoading: true }));
    try {
      const verifiedUser = await authService.verifyEmail(code);
      setState({ user: verifiedUser, isLoading: false, error: null });
      persistUser(verifiedUser);
      navigate("/"); // Redirect after successful verification
    } catch (err) {
      setState({
        ...state,
        isLoading: false,
        error: err instanceof Error ? err.message : "Verification failed"
      });
      throw err;
    }
  };

  const resendVerification = async () => {
    if (!state.user?.email) throw new Error("No email to verify");
    
    setState((prev) => ({ ...prev, isLoading: true }));
    try {
      await authService.resendVerification(state.user.email);
      setState((prev) => ({ ...prev, isLoading: false, error: null }));
    } catch (err) {
      setState({
        ...state,
        isLoading: false,
        error: err instanceof Error ? err.message : "Failed to resend code"
      });
      throw err;
    }
  };

  const logout = () => {
    setState({ user: null, isLoading: false, error: null });
    setUser(null);
    localStorage.removeItem("user");
    navigate("/login");
  };

  return {
    user: state.user,
    isLoading: state.isLoading,
    error: state.error,
    login,
    register,
    logout,
    verifyEmail,
    resendVerification,
  };
}