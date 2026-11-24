import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

// Wrap a page with this to make it available only to logged-in users.
function ProtectedRoute({ children }) {
  const { user } = useAuth();
  const location = useLocation();

  if (!user) {
    // Remember where the user wanted to go, so we can send them back after login.
    return <Navigate to="/login" state={{ from: location.pathname + location.search }} replace />;
  }
  return children;
}

export default ProtectedRoute;
