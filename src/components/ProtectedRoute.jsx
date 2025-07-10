import { Navigate } from "react-router-dom";
import { useAuthContext } from "../contexts/AuthContext";

function ProtectedRoute({ children, tipoPermitido }) {
  const { usuario } = useAuthContext();

  if (!usuario) {
    return <Navigate to="/login" replace />;
  }

  if (tipoPermitido && usuario.tipo !== tipoPermitido) {
    return <Navigate to="/" replace />;
  }

  return children;
}

export default ProtectedRoute;
