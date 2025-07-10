import { Link } from "react-router-dom";
import "../styles/Productos.css";

function Card({ producto }) {
  const nombre = producto.nombre || producto.name;
  const imagen = producto.imagen;
  const precio = producto.precio || producto.price;

  return (
    <div className="producto-card">
      <h2 className="producto-titulo">{nombre}</h2>
      <img className="producto-image" src={imagen} alt={nombre} />
     <p className="producto-precio">$ {precio.toLocaleString("es-AR")}</p>
     <Link to={`/productos/${producto.id}`}>
     <button className="producto-button">Ver más detalles</button>
     </Link>
    </div>
  );
}

export default Card;
