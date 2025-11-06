import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { useEffect } from 'react'
import { AuthProvider, useAuth } from './context/AuthContext'
import Home from './pages/Home'
import Login from './pages/Login'
import Signin from './pages/Signin'
// import Profile from './pages/Profile'
type ProtectedRouteProps = {
  component: React.ComponentType<any>;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signin" element={<Signin />} />
            <Route path="/home" element={<ProtectedRoute component={Home} />} />
            <Route path="/" element={<Navigate replace to="/login" />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

function ProtectedRoute({ component: Component }: ProtectedRouteProps) {
  const { authToken } = useAuth();

  useEffect(() => {
    console.log("Auth token has changed, current token:", authToken);
  }, [authToken]);

  return authToken ? <Component /> : <Navigate to="/login" replace />;
}
export default App;

