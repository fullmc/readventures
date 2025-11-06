import { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { authToken, login } = useAuth()
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Tentative de connexion avec :', email, password)
    const token = 'kejne'
    login(token)
    // @TODO: backend API call
  }
    useEffect(() => {
      if (authToken) {
        navigate('/home');
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
        <button type="submit">Se connecter</button>
      </form>
      <button onClick={() => (console.log('connexion avec google'))}>Se connecter avec google</button>
      <button onClick={() => navigate('/signin')}>Créer un compte</button>
    </div>
  )
}

export default Login
