 import "../Styles/Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-logo">
        <img src="/logo.png" alt="PetShop logo" width={50} />
        <span className="footer-nombre">PetShop</span>
      </div>

      <div className="footer-redes">
        <a href="https://facebook.com" target="_blank" rel="noreferrer">
          <i className="bi bi-facebook"></i>
        </a>
        <a href="https://instagram.com" target="_blank" rel="noreferrer">
          <i className="bi bi-instagram"></i>
        </a>
        <a href="https://whatsapp.com" target="_blank" rel="noreferrer">
          <i className="bi bi-whatsapp"></i>
        </a>
      </div>

      <p className="footer-copy">© 2024 - PetShop 🐾 Todos los derechos reservados.</p>
    </footer>
  );
}

export default Footer;
