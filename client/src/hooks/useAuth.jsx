import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";

// Custom hook to access the Auth context
const useAuth = () => {
  const auth = useContext(AuthContext); // Access the Auth context
  return auth; // Return the auth object
};

export default useAuth;
