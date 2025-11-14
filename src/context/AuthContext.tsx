import { createContext, useContext, useState, useEffect } from "react";
import { getMe } from "../services/authServices";

type User = {
  id: number;
  email: string;
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
    setAuthToken(token);
    localStorage.setItem("authToken", token);

    // get user after login
    getMe(token)
      .then((userData) => setUser(userData))
      .catch(() => logout());
  };

  // log out
  const logout = () => {
    setAuthToken(null);
    setUser(null);
    localStorage.removeItem("authToken");
  };

  // check if user is logged at the beginning
  useEffect(() => {
    const storedToken = localStorage.getItem("authToken");

    if (storedToken) {
      setAuthToken(storedToken);

      getMe(storedToken)
        .then((userData) => setUser(userData))
        .catch(() => logout());
    }

    setLoading(false);
  }, []);

  return (
    <AuthContext.Provider
      value={{ authToken, user, login, logout, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
};
