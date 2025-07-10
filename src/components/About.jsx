import { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../App.css";

function About() {
  useEffect(() => {
    document.title = "🐾 Conocenos - PetShop";
  }, []);

  return (
    <div className="about-wrapper"> 
      <div className="container py-5 about-section">
        <div className="row align-items-center">
          
          <div className="col-md-7">
            <h1 className="mb-4">🐶 Sobre nosotros</h1>
            <p>
              ¡Bienvenidos a nuestra tienda online! Somos un equipo apasionado por el mundo animal y creemos que cada mascota merece lo mejor.
              Por eso, seleccionamos cuidadosamente productos que brindan confort, diversión y salud, tanto para perros como para gatos.
            </p>
            <p>
              Más que una tienda, queremos ser tu aliado en el cuidado diario. Sabemos lo importante que es ese compañero de cuatro patas en tu vida,
              y por eso trabajamos cada día para acercarte soluciones prácticas, entregas rápidas y atención con corazón.
            </p>
            <p>
              Gracias por confiar en nosotros. ¡Tu mascota lo vale, y nosotros estamos acá para acompañarte!
            </p>
          </div>

          
          <div className="col-md-5 text-center mt-4 mt-md-0">
            <img
              src="/gatito.png"
              alt="Gatito señalando el texto"
              className="img-fluid"
              style={{ maxHeight: "380px" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
