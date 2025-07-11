import { useState, useEffect, useContext } from "react";
import "../Styles/Productos.css";
import Card from "./Card";
import { CarritoContext } from "../contexts/CarritoContext";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";
import { useBusquedaContext } from "../contexts/BusquedaContext";

function ProductosContainer() {
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);
  const [paginaActual, setPaginaActual] = useState(1);

  const productosPorPagina = 4;

  const { agregarAlCarrito } = useContext(CarritoContext);
  const { termino } = useBusquedaContext();

  useEffect(() => {
    document.title = "🧴 Productos - PetShop";
  }, []);

  useEffect(() => {
    const obtenerProductos = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "productos"));
        const productosFirebase = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setProductos(productosFirebase);
        setCargando(false);
      } catch (error) {
        setError("Error al cargar productos desde Firebase");
        setCargando(false);
      }
    };
    obtenerProductos();
  }, []);

  if (cargando) return <p>Cargando productos...</p>;
  if (error) return <p>{error}</p>;

  const normalizarTexto = (texto) =>
    texto.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();

  const productosFiltrados = productos.filter((producto) =>
    normalizarTexto(producto.name).includes(normalizarTexto(termino))
  );

  
  const indiceUltimoProducto = paginaActual * productosPorPagina;
  const indicePrimerProducto = indiceUltimoProducto - productosPorPagina;
  const productosActuales = productosFiltrados.slice(
    indicePrimerProducto,
    indiceUltimoProducto
  );
  const totalPaginas = Math.ceil(productosFiltrados.length / productosPorPagina);

  const cambiarPagina = (numero) => {
    setPaginaActual(numero);
    window.scrollTo({ top: 0, behavior: "smooth" }); 
  };

  return (
    <>
      <div className="productos-container">
        {productosActuales.length > 0 ? (
          productosActuales.map((producto) => (
            <Card
              key={producto.id}
              producto={producto}
              funcionCarrito={agregarAlCarrito}
            />
          ))
        ) : (
          <p>No se encontraron productos.</p>
        )}
      </div>

      
      {totalPaginas > 1 && (
        <div className="paginador">
          {Array.from({ length: totalPaginas }, (_, index) => (
            <button
              key={index + 1}
              className={`btn btn-sm mx-1 ${
                paginaActual === index + 1 ? "btn-primary" : "btn-outline-primary"
              }`}
              onClick={() => cambiarPagina(index + 1)}
            >
              {index + 1}
            </button>
          ))}
        </div>
      )}
    </>
  );
}

export default ProductosContainer;
