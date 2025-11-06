import { Routes, Route, Link } from 'react-router-dom'
import Home from './pages/Home'
import Profile from './pages/Profile'

function App() {
  return (
    <div>
      <nav>
        <Link to="/">Accueil</Link> |{' '}
        <Link to="/profile">Profil</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </div>
  )
}

export default App
