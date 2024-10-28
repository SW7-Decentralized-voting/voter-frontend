import { Routes, Route, useNavigate, useLocation, Navigate } from 'react-router-dom';
import { useEffect } from 'react';
import VotingPage from './VotingPage';
import HashVerificationPage from './HashVerificationPage';
import './App.css';

// Protected route component
function ProtectedRoute({ element }) {
  // Check if the user is verified
  const isVerified = sessionStorage.getItem('verified') === 'true';
  return isVerified ? element : <Navigate to="/verify" />;
}

function App() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Redirect to /verify if accessing root path
    if (location.pathname === '/') {
      navigate('/verify');
    }
  }, [location, navigate]);

  return (
    <>
      <Routes>
        {/* Use ProtectedRoute for /voting path */}
        <Route path="/voting" element={<ProtectedRoute element={<VotingPage />} />} />
        <Route path="/verify" element={<HashVerificationPage />} />
      </Routes>
    </>
  );
}

export default App;
