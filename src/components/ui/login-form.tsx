import { cn } from "@/lib/utils"
import { useAuth } from '@/context/AuthContext'
import { login as loginRequest } from "@/services/authServices";
import GoogleIcon from "../../../public/google.svg";

export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"form">) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { authToken, login } = useAuth()
  const navigate = useNavigate();
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
  
    try {  
      const data = await loginRequest(email, password);
  
      login(data.token);  // token stored in AuthContext
  
    } catch (error: any) {
      console.error("Erreur lors du login :", error?.response?.data || error);
      alert(error?.response?.data?.message || "Erreur lors de la connexion");
    }
  };

  useEffect(() => {
    if (authToken) {
      navigate("/home");
    }
  }, [authToken, navigate]);

  return (
    <div>
      <form className={cn("flex flex-col gap-6", className)} {...props} onSubmit={handleLogin}>
        <div className="flex flex-col items-center gap-2 text-center">
          <h1 className="text-2xl font-bold">Ravie de vous revoir :)</h1>
          <p className="text-balance text-sm text-muted-foreground">
            Entrez votre e-mail pour vous connecter.
          </p>
        </div>
        <div className="grid gap-6">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="m@example.com" onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div className="grid gap-2">
            <div className="flex items-center">
              <Label htmlFor="password">Mot de passe</Label>
              <a
                href="#"
                className="ml-auto text-sm underline-offset-4 hover:underline"
              >
                Mot de passe oublié ?
              </a>
            </div>
            <Input id="password" type="password" required onChange={(e) => setPassword(e.target.value)}/>
          </div>
          <Button type="submit" className="w-full cursor-pointer">
            Se connecter
          </Button>
          <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
            <span className="relative z-10 bg-background px-2 text-muted-foreground">
              Ou
            </span>
          </div>
          <Button variant="outline" className="w-full cursor-pointer" onClick={() => {window.location.href = backendUrl}}>
            <img src={GoogleIcon}/>
            Se connecter avec Google
          </Button>
        </div>
      </form>
      <div className="text-center text-sm">
        Don&apos;t have an account?{" "}
        <Button type="button" className="cursor-pointer" variant="link" onClick={() => navigate('/signup')}>
          Sign up
        </Button>
      </div>
    </div>
  )
}
