import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Signup from './pages/Signup';
import PrivateRoute from './components/PrivateRoute';
import Nav from './components/Navbar'

function App() {

  return (
    <Router>
      <div className="App">
        <Nav/>
        <Routes>

          {/* Public */}
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* Protected routes */}
          <Route element={<PrivateRoute />}>
            <Route path="/home" element={<Home />} />
          </Route>

        </Routes>

      </div>
    </Router>
  );
}

export default App;
