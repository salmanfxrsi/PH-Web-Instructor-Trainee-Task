import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";
import useUserInfo from "../hooks/useUserInfo";

const AdminRoutes = ({ children }) => {
  const { isLoading, userInfo } = useUserInfo();

  // Show nothing while loading user info
  if (isLoading) return null;

  // Allow access if account type is 'admin'
  if (userInfo?.accountType === "admin") {
    return children;
  }

  // Redirect to home if the account type is not 'admin'
  return <Navigate to="/" />;
};

AdminRoutes.propTypes = {
  children: PropTypes.node,
};

export default AdminRoutes;
