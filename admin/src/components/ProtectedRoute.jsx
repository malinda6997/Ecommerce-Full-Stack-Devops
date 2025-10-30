import { Navigate } from "react-router-dom";
import { authService } from "@/services/apiService";

export default function ProtectedRoute({ children }) {
  const isAuthenticated = authService.isAuthenticated();

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return children;
}
