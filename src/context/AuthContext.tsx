import { createContext, useContext, useState, useEffect } from "react";
import { getMe } from "../services/authServices";

type User = {
  id: number;
  email: string;
  theme?: "light" | "dark";
} | null;

type AuthContextType = {
  authToken: string | null;
  user: User;
  login: (token: string) => void;
  logout: () => void;
  loading: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth doit être utilisé dans un AuthProvider");
  }
  return context;
}

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [authToken, setAuthToken] = useState<string | null>(null);
  const [user, setUser] = useState<User>(null);
  const [loading, setLoading] = useState(true);

  // login
  const login = (token: string) => {
    setLoading(true);
    setAuthToken(token);
    localStorage.setItem("authToken", token);

    // get user after login
    getMe(token)
      .then((userData) => setUser(userData))
      .catch(() => logout())
      .finally(() => setLoading(false));
  };

  // log out
  const logout = () => {
    setAuthToken(null);
    setUser(null);
    localStorage.removeItem("authToken");
    setLoading(false);
  };

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const googleToken = params.get("token");
    const storedToken = localStorage.getItem("authToken");

    const tokenToUse = googleToken || storedToken;
  
    if (tokenToUse) {
      setLoading(true);
      setAuthToken(tokenToUse);
  
      // Get user
      getMe(tokenToUse)
        .then((userData) => {
          setUser(userData);
  
          // if google token, saved in localstorage
          if (googleToken) {
            localStorage.setItem("authToken", tokenToUse);
          }
        })
        .catch(logout)
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  
  }, []);

  return (
    <AuthContext.Provider
      value={{ authToken, user, login, logout, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
};
