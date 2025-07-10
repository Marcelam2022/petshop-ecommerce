import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";
import "../styles/ProductoDetalle.css";
import { CarritoContext } from "../contexts/CarritoContext";
import { useAuthContext } from "../contexts/AuthContext";
import Swal from "sweetalert2";


function ProductoDetalle() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { agregarAlCarrito } = useContext(CarritoContext);
  const { usuario } = useAuthContext();
  const tipo = usuario?.tipo;
  const [producto, setProducto] = useState(null);
  const [cantidad, setCantidad] = useState(1);

  useEffect(() => {
    if (producto) {
      document.title = `🧼 ${producto.name} - PetShop`;
    }
  }, [producto]);

  useEffect(() => {
    const obtenerProducto = async () => {
      const docRef = doc(db, "productos", id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setProducto({ id: docSnap.id, ...docSnap.data() });
      } else {
        console.error("No existe el producto");
      }
    };
    obtenerProducto();
  }, [id]);

  const incrementar = () => setCantidad(cantidad + 1);
  const decrementar = () => cantidad > 1 && setCantidad(cantidad - 1);

  const handleAgregar = () => {
    agregarAlCarrito({ ...producto, cantidad });
    Swal.fire({
      icon: "success",
      title: "Producto agregado",
      text: `${producto.name} x${cantidad} se agregó al carrito`,
      showConfirmButton: false,
      timer: 2000,
    });
  };

  const handleEditar = () => {
    navigate(`/formulario/${producto.id}`);
  };

  if (!producto) return <p>Cargando producto...</p>;

  return (
    <>
      
      <div className="producto-detalle">
        <img
          src={producto.imagen}
          alt={producto.name}
          className="producto-detalle-imagen"
        />

        <div className="producto-detalle-info">
          <h2>{producto.name}</h2>
          <p>{producto.description}</p>
          <p>
            <strong>Precio:</strong> ${producto.price}
          </p>

          {tipo !== "admin" && (
            <div className="contador">
              <button onClick={decrementar}>–</button>
              <span>{cantidad}</span>
              <button onClick={incrementar}>+</button>
            </div>
          )}

          <div className="botones-detalle">
            {tipo === "admin" ? (
              <button onClick={handleEditar} className="btn-editar">
                Editar producto
              </button>
            ) : (
              <button onClick={handleAgregar} className="btn-agregar">
                Agregar al carrito
              </button>
            )}

            <button
              onClick={() => navigate("/productos")}
              className="btn-volver"
            >
              Volver a productos
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProductoDetalle;
