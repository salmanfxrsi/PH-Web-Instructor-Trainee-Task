import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";
import useUserInfo from "../hooks/useUserInfo";

const AgentRoutes = ({ children }) => {
  const { isLoading, userInfo } = useUserInfo();

  // Show nothing while loading user info
  if (isLoading) return null;

  // Allow access if account type is 'agent'
  if (userInfo?.accountType === "agent") {
    return children;
  }

  // Redirect to home if the account type is not 'agent'
  return <Navigate to="/" />;
};

AgentRoutes.propTypes = {
  children: PropTypes.node,
};

export default AgentRoutes;
