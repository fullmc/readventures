import { cn } from "@/lib/utils"
import { useAuth } from '@/context/AuthContext'
import { login as loginRequest, forgotPassword } from "@/services/authServices";
import GoogleIcon from "@/assets/google.svg";
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"form">) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [showForgot, setShowForgot] = useState(false)
  const [forgotEmail, setForgotEmail] = useState('')
  const [forgotLoading, setForgotLoading] = useState(false)
  const [forgotMessage, setForgotMessage] = useState<string | null>(null)
  const [forgotError, setForgotError] = useState<string | null>(null)
  const { authToken, login } = useAuth()
  const navigate = useNavigate();
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      setLoading(true);
      const data = await loginRequest(email, password);

      login(data.token);  // token stored in AuthContext

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error("Erreur lors du login :", error?.response?.data || error);
      setError(error?.response?.data?.message || "Erreur lors de la connexion");
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
      {showForgot ? (
        <div className="flex flex-col gap-4">
          <h1 className="text-xl font-semibold">Mot de passe oublié ?</h1>
          <div className="flex flex-col gap-4">
            <Label htmlFor="forgot-email">Entrez votre email</Label>
            <Input id="forgot-email" type="email" placeholder="m@example.com" value={forgotEmail} onChange={(e) => setForgotEmail(e.target.value)} />
            <div className="flex gap-2">
              <Button type="button" className="cursor-pointer" onClick={async () => {
                setForgotMessage(null); setForgotError(null);
                if (!forgotEmail || !emailRegex.test(forgotEmail)) {
                  setForgotError('Veuillez renseigner une adresse email valide.');
                  return;
                }
                try {
                  setForgotLoading(true);
                  await forgotPassword(forgotEmail);
                  setForgotMessage("Si un compte existe, un email de réinitialisation a été envoyé.");
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                } catch (err: any) {
                  console.error('Erreur forgot-password', err);
                  setForgotError(err?.response?.data?.message || 'Erreur lors de la demande de réinitialisation');
                } finally {
                  setForgotLoading(false);
                }
              }} disabled={forgotLoading}>
                {forgotLoading ? 'Envoi...' : 'Envoyer'}
              </Button>
              <Button type="button" variant="ghost" className="cursor-pointer" onClick={() => { setShowForgot(false); setForgotEmail(''); setForgotError(null); setForgotMessage(null); }}>
                Annuler
              </Button>
            </div>
            {forgotMessage && <p className="text-sm text-emerald-600">{forgotMessage}</p>}
            {forgotError && <p className="text-sm text-destructive">{forgotError}</p>}
          </div>
        </div>
      ) : (
      <>
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
            <Input id="email" type="email" placeholder="m@example.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Mot de passe</Label>
            <Input id="password" type="password" onChange={(e) => setPassword(e.target.value)} required />
            <button
              type="button"
              className="ml-auto text-sm underline-offset-4 hover:underline bg-transparent border-none p-0 cursor-pointer"
              onClick={() => { setShowForgot((s) => !s); setForgotMessage(null); setForgotError(null); }}
            >
              Mot de passe oublié ?
            </button>
          </div>
           <Button type="submit" className="w-full cursor-pointer" disabled={loading}>
             {loading ? 'Connexion...' : 'Se connecter'}
           </Button>
           {error && <p className="text-sm text-destructive">{error}</p>}
          <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
            <span className="relative z-10 bg-background px-2 text-muted-foreground">
              Ou
            </span>
          </div>
          <a
            href={backendUrl}
            className="w-full cursor-pointer inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
          >
            <img src={GoogleIcon} alt="Google" width="16" height="16" />
            <span className="ml-2">Se connecter avec Google</span>
          </a>
        </div>
      </form>
      <div className="text-center text-sm">
        Vous n&apos;avez pas de compte ?
        <Button type="button" className="cursor-pointer" variant="link" onClick={() => navigate('/signup')}>
          S&apos;inscrire
        </Button>
      </div>
    </>
    )}
  </div>
  )
}
