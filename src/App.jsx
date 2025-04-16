import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home';
import Login from './components/Login/Login';
import SignUp from './components/SignUp/SignUp';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import Services from './components/Services/Services';
import ContractorProfile from './components/ContractorProfile/ContractorProfile';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app">
        <Navbar />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
          <Route path="/services" element={<ProtectedRoute><Services /></ProtectedRoute>} />
          <Route path="/contractor-profile" element={<ProtectedRoute><ContractorProfile /></ProtectedRoute>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;