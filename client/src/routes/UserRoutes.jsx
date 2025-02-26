import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";
import useUserInfo from "../hooks/useUserInfo";

const UserRoutes = ({ children }) => {
  const { isLoading, userInfo } = useUserInfo();

  // Show nothing while loading user info
  if (isLoading) return null;

  // Allow access if account type is 'user'
  if (userInfo?.accountType === "user") {
    return children;
  }

  // Redirect to home if the account type is not 'user'
  return <Navigate to="/" />;
};

UserRoutes.propTypes = {
  children: PropTypes.node,
};

export default UserRoutes;
