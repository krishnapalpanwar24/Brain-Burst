import { Navigate } from "react-router-dom";

export default function ProtectedAdminRoute({ children }) {
  const adminAuth = localStorage.getItem("adminAuth");
  return adminAuth ? children : <Navigate to="/admin-login" />;
}