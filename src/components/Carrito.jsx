import { useContext, useEffect } from "react";
import { CarritoContext } from "../contexts/CarritoContext";
import CarritoCard from "./CarritoCard";
import "../Styles/Carrito.css";
import { toast, ToastContainer } from "react-toastify";
import Swal from "sweetalert2";

function Carrito() {
  const { productosCarrito, vaciarCarrito } = useContext(CarritoContext);

  useEffect(() => {
    document.title = "🛒 Mi carrito - PetShop";
  }, []);

  const totalCarrito = productosCarrito.reduce((total, prod) => {
    const precio = Number(prod.precio || prod.price || 0);
    const cantidad = Number(prod.cantidad || 1);
    return total + precio * cantidad;
  }, 0);

  const finalizarCompra = async () => {
    if (productosCarrito.length === 0) {
      toast.warn("🛒 Tu carrito está vacío");
      return;
    }

    const resultado = await Swal.fire({
      title: "¿Confirmar compra?",
      text: "¿Deseás finalizar la compra?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Sí, finalizar",
      cancelButtonText: "Cancelar",
    });

    if (resultado.isConfirmed) {
      toast.success("🎉 ¡Compra finalizada con éxito!");
      setTimeout(() => {
        vaciarCarrito();
      }, 3000);
    }
  };

  return (
    <>
      <ToastContainer />

      <div className="carrito-container">
        {productosCarrito.length > 0 ? (
          <>
            {productosCarrito.map((producto) => (
              <CarritoCard key={producto.id} producto={producto} />
            ))}

            <div className="carrito-total">
              <strong>Total del carrito: ${totalCarrito}</strong>
            </div>

            <div className="text-center my-4">
              <button className="btn-finalizar" onClick={finalizarCompra}>
                Finalizar compra
              </button>
            </div>
          </>
        ) : (
          <p className="text-center mt-4">🛒 Carrito vacío</p>
        )}
      </div>
    </>
  );
}

export default Carrito;
