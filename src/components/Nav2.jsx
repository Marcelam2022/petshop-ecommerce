import { NavLink, useNavigate } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { FaShoppingCart, FaSearch } from "react-icons/fa";
import { AuthContext } from "../contexts/AuthContext";
import { CarritoContext } from "../contexts/CarritoContext";
import { useBusquedaContext } from "../contexts/BusquedaContext";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";
import "../Styles/Nav.css";

function Nav2() {
  const navigate = useNavigate();
  const { usuario, logout } = useContext(AuthContext);
  const { productosCarrito } = useContext(CarritoContext);
  const { termino, setTermino } = useBusquedaContext();

  const [productos, setProductos] = useState([]);
  const [sugerencias, setSugerencias] = useState([]);
  const [menuAbierto, setMenuAbierto] = useState(false);

  useEffect(() => {
    const obtenerProductos = async () => {
      const querySnapshot = await getDocs(collection(db, "productos"));
      const productosFirebase = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setProductos(productosFirebase);
    };
    obtenerProductos();
  }, []);

  useEffect(() => {
    if (termino.length > 0) {
      const normalizar = (texto) =>
        texto.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
      const filtrados = productos.filter((p) =>
        normalizar(p.name).includes(normalizar(termino))
      );
      setSugerencias(filtrados.slice(0, 5));
    } else {
      setSugerencias([]);
    }
  }, [termino, productos]);

  const manejarBusqueda = (e) => {
    e.preventDefault();
    navigate("/productos");
    setMenuAbierto(false);
  };

  const manejarClickSugerencia = (nombre) => {
    setTermino(nombre);
    navigate("/productos");
    setSugerencias([]);
    setMenuAbierto(false);
  };

  const cantidadEnCarrito = productosCarrito.reduce(
    (acc, prod) => acc + (prod.cantidad || 1),
    0
  );

  const cerrarMenu = () => setMenuAbierto(false);

  return (
    <nav className="navbar navbar-expand-md">
      <div className="container-fluid d-flex justify-content-between align-items-center">
        
        <NavLink to="/" className="navbar-brand" onClick={cerrarMenu}>
          <img src="/logo.png" alt="Logo PetShop" />
        </NavLink>

        
        <form className="buscador-form buscador-mobile" onSubmit={manejarBusqueda}>
          <div className="buscador-wrapper">
            <input
              type="text"
              className="buscador-input"
              placeholder="Buscar productos..."
              value={termino}
              onChange={(e) => setTermino(e.target.value)}
            />
            {termino && (
              <span className="icono-clear" onClick={() => setTermino("")}>
                ×
              </span>
            )}
            <FaSearch className="icono-lupa" />
          </div>
          {sugerencias.length > 0 && (
            <ul className="list-group buscador-dropdown">
              {sugerencias.map((prod) => (
                <li
                  key={prod.id}
                  className="list-group-item list-group-item-action"
                  onClick={() => manejarClickSugerencia(prod.name)}
                >
                  {prod.name}
                </li>
              ))}
            </ul>
          )}
        </form>

        
        <button
          className="navbar-toggler"
          type="button"
          onClick={() => setMenuAbierto(!menuAbierto)}
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        
        <div className={`collapse navbar-collapse ${menuAbierto ? "show" : ""}`}>
          <ul className="navbar-nav me-auto mb-2 mb-md-0 nav-list">
            {["/", "/productos", "/contacto", "/nosotros"].map((path, i) => (
              <li className="nav-item" key={i}>
                <NavLink
                  to={path}
                  className="nav-link"
                  onClick={cerrarMenu}
                  end={path === "/"}
                >
                  {["Inicio", "Productos", "Contacto", "Nosotros"][i]}
                </NavLink>
              </li>
            ))}
          </ul>

          
          <form className="buscador-form buscador-desktop" onSubmit={manejarBusqueda}>
            <div className="buscador-wrapper">
              <input
                type="text"
                className="buscador-input"
                placeholder="Buscar productos..."
                value={termino}
                onChange={(e) => setTermino(e.target.value)}
              />
              {termino && (
                <span className="icono-clear" onClick={() => setTermino("")}>
                  ×
                </span>
              )}
              <FaSearch className="icono-lupa" />
            </div>
            {sugerencias.length > 0 && (
              <ul className="list-group buscador-dropdown">
                {sugerencias.map((prod) => (
                  <li
                    key={prod.id}
                    className="list-group-item list-group-item-action"
                    onClick={() => manejarClickSugerencia(prod.name)}
                  >
                    {prod.name}
                  </li>
                ))}
              </ul>
            )}
          </form>

          
          <div className="nav-usuario d-flex align-items-center">
            <NavLink
              to="/carrito"
              className="carrito-icono-nav me-3"
              onClick={cerrarMenu}
            >
              <div className="carrito-wrapper">
                <FaShoppingCart size={20} />
                {cantidadEnCarrito > 0 && (
                  <span className="contador-carrito">{cantidadEnCarrito}</span>
                )}
              </div>
            </NavLink>
            {usuario ? (
              <>
                <span className="user-greeting">
                  Hola, {usuario.email === "admin@admin.com" ? "admin" : "usuario"}
                </span>
                <button
                  onClick={() => {
                    logout();
                    navigate("/");
                    cerrarMenu();
                  }}
                  className="btn-cerrar-sesion"
                >
                  Cerrar sesión
                </button>
              </>
            ) : (
              <NavLink
                to="/login"
                className="btn-iniciar-sesion"
                onClick={cerrarMenu}
              >
                Iniciar sesión
              </NavLink>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Nav2;
