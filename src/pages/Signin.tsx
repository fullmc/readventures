import { useState } from 'react'

function Signin() {
  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleSignin = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Tentative de création de compte avec :', username, email, password)
    // @TODO: backend API call
  }

  return (
    <div>
      <h2>Créer un compte</h2>
      <form onSubmit={handleSignin}>
        <input
          type="text"
          placeholder="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
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
        <button type="submit">Créer</button>
      </form>
    </div>
  )
}

export default Signin
