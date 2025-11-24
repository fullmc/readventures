import { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import { signup as signupRequest } from '../services/authServices'

function Signup() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const { authToken, login } = useAuth()
  const navigate = useNavigate()

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
  
    // check passwords
    if (password !== confirmPassword) {
      alert("Les mots de passe ne correspondent pas.");
      return;
    }
  
    try {
      const data = await signupRequest(email, password);
  
      // User automatically logged in
      login(data.token);
  
      // Redirect
      navigate('/home');
  
    } catch (error: any) {
      console.error("Signup error:", error?.response?.data || error);
      alert(error?.response?.data?.message || "Erreur lors de l'inscription");
    }
  };
  

  useEffect(() => {
    if (authToken) navigate('/home')
  }, [authToken, navigate])

  return (
    <div>
      <h2>Créer un compte</h2>

      <form onSubmit={handleRegister}>
        <input
          type="email"
          placeholder="Adresse e-mail"
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

        <input
          type="password"
          placeholder="Confirmer le mot de passe"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />

        <button type="submit">Créer mon compte</button>
      </form>

      <button onClick={() => navigate('/')}>
        J’ai déjà un compte
      </button>
    </div>
  )
}

export default Signup
