import { useAuth } from "@/context/AuthContext";
import { ThemeToggle } from "@/components/ui/themeToggle";
import { cn } from "@/lib/utils";
import { navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";

export default function Navbar() {
  const { authToken, logout } = useAuth();

  return (
    <nav className="border-b">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo/Brand */}
          <div className="flex items-center">
            <Link to={authToken ? "/home" : "/"} className="text-xl font-bold">
              Readventures
            </Link>
          </div>

          {/* Navigation Menu */}
          <div className="flex items-center gap-4">
            <NavigationMenu>
              <NavigationMenuList>
                {authToken ? (
                  // Authenticated navigation
                  <>
                    <NavigationMenuItem>
                      <NavLink
                        to="/home"
                        className={({ isActive }) =>
                          cn(
                            navigationMenuTriggerStyle(),
                            "cursor-pointer",
                            isActive && "bg-accent"
                          )
                        }
                      >
                        Accueil
                      </NavLink>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                      <NavLink
                        to="/profile"
                        className={({ isActive }) =>
                          cn(
                            navigationMenuTriggerStyle(),
                            "cursor-pointer",
                            isActive && "bg-accent"
                          )
                        }
                      >
                        Profil
                      </NavLink>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                      <NavLink
                        to="/"
                        onClick={logout}
                        className={cn(navigationMenuTriggerStyle())}
                      >
                        Déconnexion
                      </NavLink>
                    </NavigationMenuItem>

                    {/* Theme Toggle */}
                    <ThemeToggle />
                  </>
                ) : (
                  // Public navigation
                  <>
                    <NavigationMenuItem>
                      <NavLink
                        to="/login"
                        className={({ isActive }) =>
                          cn(
                            navigationMenuTriggerStyle(),
                            "cursor-pointer",
                            isActive && "bg-accent"
                          )
                        }
                      >
                        Connexion
                      </NavLink>
                    </NavigationMenuItem>
                  </>
                )}
              </NavigationMenuList>
            </NavigationMenu>

          </div>
        </div>
      </div>
    </nav>
  );
}