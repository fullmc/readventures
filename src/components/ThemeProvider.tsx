import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { updateTheme } from "@/services/authServices";

type Theme = "light" | "dark";
// | add other themes

const ThemeContext = createContext<{
  theme: Theme;
  setTheme: (t: Theme) => void;
} | null>(null);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const { user, authToken } = useAuth();
  const [theme, setTheme] = useState<Theme>(() => {
    // Load theme from localStorage at init (fallback)
    const stored = localStorage.getItem("theme");
    return (stored as Theme) || "light";
  });

  // Get theme from backend if user is logged in
  useEffect(() => {
    if (user?.theme) {
      setTheme(user.theme);
    }
  }, [user?.theme]);

  // Update backend when switching themes
  const handleSetTheme = async (newTheme: Theme) => {
    setTheme(newTheme);
    
    // store it to make it persist
    localStorage.setItem("theme", newTheme);

    if (authToken) {
      try {
        const response = await updateTheme(authToken, newTheme);
        // Use backend theme if different
        if (response?.theme) {
          setTheme(response.theme);
        }
      } catch (error) {
        console.error("Error updating theme:", error);
      }
    }
  };

  useEffect(() => {
    document.documentElement.className = "";
    document.documentElement.classList.add(theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme: handleSetTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used inside ThemeProvider");
  return ctx;
};
