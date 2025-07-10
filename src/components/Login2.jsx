import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../contexts/AuthContext";
import Swal from "sweetalert2";
import "../styles/Login.css";

function Login2() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [registrarse, setRegistrarse] = useState(false);
  const { login, register } = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    document.title = registrarse
      ? "📝 Registrarse - PetShop"
      : "🔐 Iniciar sesión - PetShop";
  }, [registrarse]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      Swal.fire("Faltan datos", "Completá todos los campos", "warning");
      return;
    }

    try {
      if (registrarse) {
        await register(email, password);
        Swal.fire("Registro exitoso", "Ya podés iniciar sesión", "success");
        setRegistrarse(false);
      } else {
        await login(email, password);

        if (email === "admin@admin.com") {
          Swal.fire("¡Bienvenido, admin!", "Sesión iniciada con éxito", "success");
          navigate("/formulario");
        } else {
          Swal.fire("¡Bienvenido, usuario!", "Sesión iniciada con éxito", "success");
          navigate("/");
        }
      }
    } catch (error) {
      const mensajes = {
        "auth/user-not-found": "Usuario no encontrado",
        "auth/wrong-password": "Contraseña incorrecta",
        "auth/email-already-in-use": "Ese correo ya está registrado",
        "auth/weak-password": "La contraseña debe tener al menos 6 caracteres",
      };

      Swal.fire("Error", mensajes[error.code] || error.message, "error");
    }
  };

  return (
    <>
      <div className="login-container">
        <form onSubmit={handleSubmit} className="login-card">
          <h2>{registrarse ? "Registrarse" : "Iniciar sesión"}</h2>

          <label>Correo electrónico:</label>
          <input
            type="email"
            className="form-control mb-2"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label>Contraseña:</label>
          <input
            type="password"
            className="form-control mb-3"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button className="btn btn-primary" type="submit">
            {registrarse ? "Registrarme" : "Iniciar sesión"}
          </button>

          <p onClick={() => setRegistrarse(!registrarse)}>
            {registrarse
              ? "¿Ya tenés cuenta? Iniciá sesión"
              : "¿No tenés cuenta? Regístrese"}
          </p>
        </form>
      </div>
    </>
  );
}

export default Login2;
