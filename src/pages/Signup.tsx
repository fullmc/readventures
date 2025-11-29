import { useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import SignupPage from '@/components/Signup'

function Signup() {
  const { authToken } = useAuth()
  const navigate = useNavigate()

 
  useEffect(() => {
    if (authToken) navigate('/home')
  }, [authToken, navigate])

  return (
    <div>
      <SignupPage />
    </div>
  )
}

export default Signup
