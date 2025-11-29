import { useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom';
import LoginPage from '@/components/Login';

function Login() {
  const { authToken } = useAuth()
  const navigate = useNavigate();


  useEffect(() => {
    if (authToken) {
      navigate("/home");
    }
  }, [authToken, navigate]);

  return (
    <div>
      <LoginPage/>
    </div>
  )
}

export default Login
