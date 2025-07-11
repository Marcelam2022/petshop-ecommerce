import "../Styles/Header.css";
import { Link } from "react-router-dom";

function Header() {
  return (
    <header className="banner-container">
      <div className="banner-texto">
        <h1>Bienvenidos a PetShop</h1>
        <p>Tu tienda de confianza para mimar a tus mascotas 🐾</p>
        <Link to="/productos" className="boton-banner">Ver productos</Link>
      </div>
    </header>
  );
}

export default Header;
