import { Navigate } from 'react-router-dom';
import { useAuth } from "../hooks/useAuth";

function ForbiddenRoute({ children }) {
  const { loggedIn } = useAuth();
  if (loggedIn) {
    return <Navigate to="/groups" replace={true} />
  }

  return children;
}

export default ForbiddenRoute;