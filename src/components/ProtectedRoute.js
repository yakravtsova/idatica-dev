/*import React from 'react';
import { Navigate } from 'react-router-dom';

function ProtectedRoute({ loggedIn, children }) {
  if (!loggedIn) {
    return <Navigate to="/" replace />
  }

  return children;
}*/

import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const ProtectedRoute = ({ children }) => {
  const { loggedIn } = useAuth();
  if (!loggedIn) {
    // user is not authenticated
    return <Navigate to="/start" />;
  }
  return children;
};

export default ProtectedRoute;