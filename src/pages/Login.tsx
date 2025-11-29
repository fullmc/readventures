import { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom';
import { login as loginRequest } from "../services/authServices";

function Login() {
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
      <h2>Connexion</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <Button type="submit">Se connecter</Button>
      </form>
      <button onClick={() => {window.location.href = backendUrl}}>Se connecter avec google</button>
      <button onClick={() => navigate('/signup')}>Créer un compte</button>
    </div>
  )
}

export default Login
