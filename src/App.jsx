import { Routes, Route, Navigate } from 'react-router-dom';
import VotingPage from './Screens/VotingPage';
import HashVerificationPage from './Screens/HashVerificationPage';
import VerifyKeyPage from './Screens/VerifyKeyPage';
import './App.css';

// Protected route component
function ProtectedRoute({ element }) {
  // Check if the user is verified
  const isVerified = sessionStorage.getItem('verified') === 'true';
  return isVerified ? element : <Navigate to="/login" />;
}

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Navigate to='/login' />} />
        <Route path="/login" element={<VerifyKeyPage />} />
        <Route path="/voting" element={<ProtectedRoute element={<VotingPage />} />} />
        <Route path="/verify" element={<HashVerificationPage />} />
      </Routes>
    </>
  );
}

export default App;
