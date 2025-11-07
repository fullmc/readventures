import { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'

function Signin() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const { authToken, login } = useAuth()
  const navigate = useNavigate()

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault()

    // check passwords
    if (password !== confirmPassword) {
      alert('Les mots de passe ne correspondent pas.')
      return
    }

    // fake creation
    console.log('Création de compte pour :', email)
    const fakeToken = 'new_user_token'
    login(fakeToken)
    // @TODO : backend call
  }

  // if user logged, go home
  useEffect(() => {
    if (authToken) {
      navigate('/home')
    }
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

      <button onClick={() => navigate('/login')}>
        J’ai déjà un compte
      </button>
    </div>
  )
}

export default Signin
