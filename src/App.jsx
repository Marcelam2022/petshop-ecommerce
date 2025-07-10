import { Routes, Route, useLocation } from "react-router-dom";
import Nav from "./components/Nav2";
import { useAuthContext } from "./contexts/AuthContext"; 
import Home from "./layouts/Home";
import ProductosContainer from "./components/ProductosContainer";
import ProductoDetalle from "./components/ProductoDetalle";
import Carrito from "./components/Carrito";
import Contacto from "./components/Contacto";
import About from "./components/About";
import FormularioProducto from "./components/FormularioProducto";
import Login2 from "./components/Login2";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";
import ScrollToTop from "./components/ScrollToTop"; 

function App() {
  const location = useLocation(); 
   const { cargando}= useAuthContext();
   if (cargando) {
    return (
      <div className="spinner-container">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className="app-layout">
      <Nav />

      <ScrollToTop /> 

      <div className="contenido">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home />} />
          <Route path="/productos" element={<ProductosContainer />} />
          <Route path="/productos/:id" element={<ProductoDetalle />} />
          <Route path="/contacto" element={<Contacto />} />
          <Route path="/nosotros" element={<About />} />
          <Route path="/login" element={<Login2 />} />

          
          <Route
            path="/carrito"
            element={
              <ProtectedRoute>
                <Carrito />
              </ProtectedRoute>
            }
          />
          <Route
            path="/formulario"
            element={
              <ProtectedRoute tipoPermitido="admin">
                <FormularioProducto />
              </ProtectedRoute>
            }
          />
          <Route
            path="/formulario/:id"
            element={
              <ProtectedRoute tipoPermitido="admin">
                <FormularioProducto />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>

      <Footer />
    </div>
  );
}

export default App;
