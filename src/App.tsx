import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import { ThemeToggle } from '@/components/ui/themeToggle'
import PrivateRoute from './components/PrivateRoute';

function App() {

  return (
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

        </Routes>
        <ThemeToggle />

      </div>
    </Router>
  );
}

export default App;
