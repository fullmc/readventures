import { cn } from "@/lib/utils"
import { useAuth } from '@/context/AuthContext'
import { signup as signupRequest } from '../../services/authServices'
import GoogleIcon from "@/assets/google.svg";

export function SignupForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"form">) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const { authToken, login } = useAuth()
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const navigate = useNavigate();
  
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
  
    // check email format
    if (!emailRegex.test(email)) {
      setError("Format d'email invalide.");
      return;
    }
  
    // check passwords
    if (password !== confirmPassword) {
      setError("Les mots de passe ne correspondent pas.");
      return;
    }
  
    try {
      setLoading(true);
      const data = await signupRequest(email, password);  
  
      // User automatically logged in
      login(data.token);
  
      // Redirect
      navigate('/home');
  
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error("Signup error:", error?.response?.data || error);
      setError(error?.response?.data?.message || "Erreur lors de l'inscription");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (authToken) {
      navigate("/home");
    }
  }, [authToken, navigate]);

  return (
    <div>
      <form className={cn("flex flex-col gap-6", className)} {...props} onSubmit={handleRegister}>
        <div className="flex flex-col items-center gap-2 text-center">
          <h1 className="text-2xl font-bold">Bienvenue ;)</h1>
          <p className="text-balance text-sm text-muted-foreground">
            Complète le formulaire ci-dessous pour créer ton compte.
          </p>
          {error && (
            <p className="text-sm text-red-500 font-medium">{error}</p>
          )}
        </div>
        <div className="grid gap-6">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="m@example.com" value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="off" required />

          </div>
          <div className="grid gap-6">
            <div className="flex flex-col gap-2">
              <Label htmlFor="password">Mot de passe</Label>
              <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} autoComplete="new-password" required />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="confirmPassword">Confirmer le mot de passe</Label>
              <Input id="confirmPassword" type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} autoComplete="new-password" required />
            </div>
          </div>
          <Button type="submit" className="w-full cursor-pointer" disabled={loading}>
            {loading ? "Création en cours..." : "Créer mon compte"}
          </Button>
          <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
            <span className="relative z-10 bg-background px-2 text-muted-foreground">
              Ou
            </span>
          </div>
          <Button variant="outline" className="w-full cursor-pointer" onClick={() => {window.location.href = backendUrl}}>
            <img src={GoogleIcon}/>
            S'enregistrer avec Google
          </Button>
        </div>
      </form>
      <div className="text-center text-sm">
        <Button type="button" className="cursor-pointer" variant="link" onClick={() => navigate('/login')}>
          J'ai déjà un compte
        </Button>
      </div>
    </div>
  )
}
