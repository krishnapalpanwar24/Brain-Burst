import { Navigate } from "react-router-dom";

export default function ProtectedUserRoute({ children }) {
  const isLogged = localStorage.getItem("userloggedIn");
  return isLogged ? children : <Navigate to="/login" />;
}