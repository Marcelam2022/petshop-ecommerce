 
import React, { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

function Main() {
  const { usuario } = useContext(AuthContext);

  return (
    <main className="main-section">
      
      <section className="home-intro text-center p-4">
        <h2 className="fw-bold">Nuestras mascotas felices</h2>
        <p className="mb-2">
          Mirá cómo nuestros productos hacen la diferencia. Perros y gatos felices, cómodos y bien cuidados.
        </p>
        <p className="text-muted mb-4">
          Cada uno lo vive a su estilo: jugar, dormir… o mirar raro el champú 😼💤
        </p>

        <div className="carousel-container mx-auto">
          <div id="carruselMascotas" className="carousel slide" data-bs-ride="carousel">
            <div className="carousel-indicators">
              <button type="button" data-bs-target="#carruselMascotas" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
              <button type="button" data-bs-target="#carruselMascotas" data-bs-slide-to="1" aria-label="Slide 2"></button>
              <button type="button" data-bs-target="#carruselMascotas" data-bs-slide-to="2" aria-label="Slide 3"></button>
            </div>

            <div className="carousel-inner">
              <div className="carousel-item active text-center">
                <img src="./carrusel3.png" className="img-fluid rounded mx-auto d-block" alt="Perro y gato con juguetes" />
              </div>
              <div className="carousel-item text-center">
                <img src="./carrusel2.png" className="img-fluid rounded mx-auto d-block" alt="Perro en su cama" />
              </div>
              <div className="carousel-item text-center">
                <img src="./carrusel1.png" className="img-fluid rounded mx-auto d-block" alt="Gato bañándose con el mejor shampoo" />
              </div>
            </div>

            <button className="carousel-control-prev" type="button" data-bs-target="#carruselMascotas" data-bs-slide="prev">
              <span className="carousel-control-prev-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Anterior</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#carruselMascotas" data-bs-slide="next">
              <span className="carousel-control-next-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Siguiente</span>
            </button>
          </div>
        </div>
      </section>

      
      <section className="container my-5">
        <h2 className="text-center fw-bold mb-4">Lo que dicen nuestros clientes</h2>
        <div className="row justify-content-center">
          {[
            {
              texto: "“Mi gato ama los juguetes que compré en esta tienda. ¡No deja de jugar desde que llegaron!”",
              autor: "— Ana, mamá de Michi"
            },
            {
              texto: "“Los productos para baño son de excelente calidad. Mi perro quedó con un aroma hermoso.”",
              autor: "— Diego, humano de Rocky"
            },
            {
              texto: "“Atención excelente, envío rápido y buenos precios. ¡Muy recomendable!”",
              autor: "— Carla, clienta frecuente"
            }
          ].map((testimonio, i) => (
            <div className="col-md-4 mb-3" key={i}>
              <div
                className="card shadow-sm border rounded-3 h-100 bg-white"
                style={{ transition: "transform 0.3s ease" }}
                onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.03)")}
                onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
              >
                <div className="card-body">
                  <p className="card-text">{testimonio.texto}</p>
                  <h6 className="card-subtitle text-muted mt-3">{testimonio.autor}</h6>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      
      <div className="text-center my-4 fs-4">
        🥣 🐶 🐱 🦴 🎾 👕 🐾
      </div>

      
      <section className="container my-5">
        <h2 className="text-center fw-bold mb-4">¿Por qué elegirnos?</h2>
        <div className="row text-center">
          {[
            { icono: "🐶", titulo: "Para todas las mascotas", texto: "Perros, gatos y más. ¡Productos para todos!" },
            { icono: "🚚", titulo: "Envío rápido", texto: "Tu pedido llega seguro y sin demoras." },
            { icono: "💳", titulo: "Pagos protegidos", texto: "Tus datos siempre seguros con nosotros." },
            { icono: "🎁", titulo: "Promos semanales", texto: "Descuentos especiales para mimarlos más." }
          ].map((item, i) => (
            <div className="col-md-3 mb-4" key={i}>
              <div
                className="p-3 border rounded-3 shadow-sm h-100 bg-white"
                style={{ transition: "transform 0.3s ease" }}
                onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.03)")}
                onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
              >
                <span className="fs-2">{item.icono}</span>
                <h5 className="mt-2">{item.titulo}</h5>
                <p className="text-muted">{item.texto}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      
      <section className="text-center my-5">
        <h2 className="fw-bold mb-3">De nuestra pasión a tu hogar</h2>
        <p className="mb-4">Todo lo que hacemos es para que tu mascota sea feliz y esté cuidada.</p>
        <a
          href={usuario ? "/productos" : "/login"}
          className="btn btn-outline-primary px-4 py-2"
        >
          {usuario ? "Descubrí nuestros productos" : "Iniciá sesión para descubrir nuestros productos"}
        </a>
      </section>
    </main>
  );
}

export default Main;
