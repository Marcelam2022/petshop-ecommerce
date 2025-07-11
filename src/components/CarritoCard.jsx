import { useContext } from "react";
import { CarritoContext } from "../contexts/CarritoContext";
import "../Styles/CarritoCard.css";

function CarritoCard({ producto }) {
  const { actualizarCantidad, borrarProductoCarrito } = useContext(CarritoContext);

  const nombre = producto.nombre || producto.name;
  const descripcion = producto.descripcion || producto.description;
  const imagen = producto.imagen;
  const precioUnitario = producto.precio || producto.price;
  const cantidad = producto.cantidad || 1;
  const subtotal = precioUnitario * cantidad;

  function sumar() {
    actualizarCantidad(producto.id, cantidad + 1);
  }

  function restar() {
    if (cantidad > 1) {
      actualizarCantidad(producto.id, cantidad - 1);
    }
  }

  return (
    <div className="carritoCard-container">
      <img className="carritoCard-image" src={imagen} alt={nombre} />

      <div className="carritoCard-info">
        <p className="carritoCard-titulo">{nombre}</p>
        <p className="carritoCard-descripcion">{descripcion}</p>
      </div>

      <div className="carritoCard-col-acciones">
        <div className="carritoCard-contador">
          <button onClick={restar}>-</button>
          <span>{cantidad}</span>
          <button onClick={sumar}>+</button>
        </div>
        <p><strong>Precio unitario:</strong> ${precioUnitario.toLocaleString("es-AR")}</p>
        <p><strong>Subtotal:</strong> ${subtotal.toLocaleString("es-AR")}</p>
        <button
          className="carritoCard-button"
          onClick={() => borrarProductoCarrito(producto.id)}
        >
          🗑️ Eliminar
        </button>
      </div>
    </div>
  );
}

export default CarritoCard;
