import { createContext, useContext, useEffect, useRef, useState } from "react";
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

// eslint-disable-next-line react-refresh/only-export-components
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
  const [initialized, setInitialized] = useState(false);
  const hasInitialized = useRef(false);

  // login
  const login = (token: string) => {
    // Avoid multiple API calls if same token
    if (authToken === token && user) {
      return;
    }

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
    if (hasInitialized.current) return;
    hasInitialized.current = true;

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

          // if google token, save in localstorage and navigate to home
          if (googleToken) {
            localStorage.setItem("authToken", tokenToUse);
            // ensure user arrives on Home after Google sign-in
            window.location.href = '/home';
          }
        })
        .catch(logout)
        .finally(() => {
          setLoading(false);
          // if we have a google token, we redirect to /home
          if (!googleToken) {
            setInitialized(true);
          }
        });
    } else {
      setLoading(false);
      setInitialized(true);
    }
  
  }, []);

  if (!initialized) {
    return null; // @TODO: add a loading spinner here
  }

  return (
    <AuthContext.Provider
      value={{ authToken, user, login, logout, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
};
