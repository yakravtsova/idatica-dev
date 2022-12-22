import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const ProtectedRoute = ({ children }) => {
  const { loggedIn } = useAuth();
  if (!loggedIn) {
    return <Navigate to="/" />;
  }
  return children;
};

export default ProtectedRoute;