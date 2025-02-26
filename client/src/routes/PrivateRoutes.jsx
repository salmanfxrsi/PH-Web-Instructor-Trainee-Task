import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import PropTypes from "prop-types";

const PrivateRoutes = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  // Show loading state while authentication is being checked
  if (loading) return null;

  // If user is authenticated, render children; otherwise, redirect to login
  return user ? children : <Navigate to="/login" state={{ from: location }} />;
};

PrivateRoutes.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PrivateRoutes;
