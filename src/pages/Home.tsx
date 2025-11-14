import { useAuth } from '../context/AuthContext';


function Home() {
  const { logout } = useAuth()

  return (
    <div>
      <h2>Accueil</h2>
      <p>Bienvenue dans ta librairie personnelle 📚</p>
      <button onClick={logout}>Se déconnecter</button>
    </div>

  )
}

export default Home