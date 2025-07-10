import { useEffect, useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";
import Swal from "sweetalert2";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/Contacto.css";

function Contacto() {
  useEffect(() => {
    document.title = "📩 Contacto - PetShop";
  }, []);

  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    mensaje: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.nombre || !formData.email || !formData.mensaje) {
      Swal.fire("Error", "Por favor completá todos los campos", "warning");
      return;
    }

    try {
      await addDoc(collection(db, "mensajesContacto"), {
        ...formData,
        fecha: new Date().toISOString(),
      });

      Swal.fire("¡Mensaje enviado!", "Te responderemos pronto", "success");

      setFormData({ nombre: "", email: "", mensaje: "" });
    } catch (error) {
      Swal.fire("Error", "No se pudo enviar el mensaje", "error");
    }
  };

  return (
    <div className="contacto-bg">
      <section className="form-contacto">
        <h1>📩 ¡Estamos para ayudarte!</h1>
        <p>
          ¿Tenés alguna duda o consulta?{" "}
          <span style={{ fontWeight: "600" }}>
            ¡Escribinos y te responderemos lo antes posible!
          </span>
        </p>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="nombre" className="form-label">Nombre</label>
            <input
              type="text"
              className="form-control"
              id="nombre"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              placeholder="Tu nombre"
            />
          </div>

          <div className="mb-3">
            <label htmlFor="email" className="form-label">Correo electrónico</label>
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Tu correo"
            />
          </div>

          <div className="mb-3">
            <label htmlFor="mensaje" className="form-label">Mensaje</label>
            <textarea
              className="form-control"
              id="mensaje"
              name="mensaje"
              rows="4"
              value={formData.mensaje}
              onChange={handleChange}
              placeholder="Escribí tu consulta acá..."
            ></textarea>
          </div>

          <button type="submit" className="btn btn-enviar mt-3">
            Enviar ✨
          </button>
        </form>
      </section>
    </div>
  );
}

export default Contacto;
