import { Link } from "react-router-dom";
import card1 from "./img/card1.jpg";
import card2 from "./img/card2.jpg";
import mancuera from "./img/mancuera.jpg";
import saltoCuerda from "./img/salto cuerda.jpg";
import box from "./img/box.jpg";

function Home() {
  return (
    <>
      <section className="hero">
        <div className="center-container">
          <div className="center-text">BUSCA TU GYMBRO!</div>
          <Link to="/registro" className="btn-unete">ÚNETE YA!</Link>
        </div>
      </section>

      <section className="sobre-nosotros">
        <div className="sobre-contenido">
          <div>
            <h2>SOBRE NOSOTROS</h2>
            <div className="sobre-caja">
              <p>
                La web hecha para los que saben que entrenar solo no es lo mismo. 💪<br />
                Un espacio donde encontrás compañeros con tu misma energía para motivarte, progresar y disfrutar cada serie. 🤝
              </p>
              <p>
                Acá conectás con tu gymbro o gymsis, compartís tips, rutinas y lográs que el entrenamiento sea mucho más que levantar pesas — es crecer acompañado. 🚀
              </p>
              <p>GYMBRO es comunidad, motivación y progreso. 🏋️‍♂️✨</p>
            </div>
          </div>
          <div className="sobre-cards">
            <div className="card-img">
              <img src={card1} alt="Card 1" />
            </div>
            <div className="card-img">
              <img src={card2} alt="Card 2" />
            </div>
          </div>
        </div>
      </section>

      <section className="que-ofrecemos">
        <div className="que-ofrecemos-container">
          <h2 className="que-ofrecemos-titulo">¿QUÉ OFRECEMOS?</h2>
          <p className="que-ofrecemos-descripcion">
            Nos comprometemos a brindarte la mejor experiencia de entrenamiento.
          </p>
          <div className="que-ofrecemos-cards">
            <div className="ofrecemos-card">
              <img src={mancuera} alt="BUSQUEDA PERSONALIZADO" />
              <div className="ofrecemos-card-text">BUSQUEDA PERSONALIZADO</div>
            </div>
            <div className="ofrecemos-card">
              <img src={saltoCuerda} alt="PROGRESO EN TUS ENTRENAMIENTOS" />
              <div className="ofrecemos-card-text">PROGRESO EN TUS ENTRENAMIENTOS</div>
            </div>
            <div className="ofrecemos-card">
              <img src={box} alt="CONOCE GENTE!" />
              <div className="ofrecemos-card-text">CONOCE GENTE!</div>
            </div>
          </div>
        </div>
      </section>

      <section className="contacto">
        <div className="contacto-contenido">
          <div className="contacto-texto">
            <h2>PONTE EN CONTACTO CON NOSOTROS</h2>
          </div>
          <Link to="/contacto" className="btn-contacto">Contacto</Link>
        </div>
      </section>
    </>
  );
}

export default Home;
