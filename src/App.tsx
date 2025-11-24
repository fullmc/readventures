import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';

import PrivateRoute from './components/PrivateRoute';

function App() {

  return (
    <AuthProvider>
      <Router>
        <div className="App">
   
          <Routes>

            {/* Public */}
            <Route path="/" element={<Login />} />
            <Route path="/signup" element={<Signup />} />

            {/* Protected routes */}
            <Route element={<PrivateRoute />}>
              <Route path="/home" element={<Home />} />
            </Route>

            {/* Default redirection */}
            <Route path="/" element={<Navigate replace to="/home" />} />

          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
