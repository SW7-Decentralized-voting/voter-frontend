import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';

// Protected route component
export default function ProtectedRoute({ element }) {
  // Check if the user is verified
  const isVerified = sessionStorage.getItem('jwt');
  return isVerified ? element : <Navigate to="/login" />;
}

ProtectedRoute.propTypes = {
  element: PropTypes.node.isRequired,
};