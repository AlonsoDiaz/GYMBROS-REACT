import { Link } from "react-router-dom";
import useAuthUser from "./hooks/useAuthUser";
import card1 from "./img/card1.jpg";
import saltoCuerda from "./img/salto cuerda.jpg";
import box from "./img/box.jpg";

function MemberHome() {
  const user = useAuthUser();
  const firstName = user?.nombre?.split(" ")[0] || "Gymbro";

  return (
    <>
      <section className="member-hero">
        <div className="member-hero-overlay" />
        <div className="member-hero-content">
          <p className="member-hero-kicker">Bienvenido de nuevo</p>
          <h1>Hola, {firstName}</h1>
          <p className="member-hero-subtitle">
            Tu perfil está activo. Desde acá puedes coordinar entrenamientos, revisar actividades pendientes y seguir creciendo
            junto a la comunidad.
          </p>
          <div className="member-hero-actions">
            <Link to="/contacto" className="btn-primary">Contactar soporte</Link>
            <Link to="/" className="btn-secondary">Explorar novedades</Link>
          </div>
        </div>
      </section>

      <section className="member-dashboard">
        <div className="member-card member-card--profile">
          <h2>Mi Perfil</h2>
          <div className="member-profile-grid">
            <div>
              <span className="label">Nombre</span>
              <p>{user?.nombre}</p>
            </div>
            <div>
              <span className="label">Correo</span>
              <p>{user?.correo}</p>
            </div>
            <div className="member-status">
              <span className="label">Estado</span>
              <p>Activo · Acceso completo</p>
            </div>
          </div>
          <Link to="/contacto" className="member-link">Actualizar información</Link>
        </div>

        <div className="member-card member-card--highlights">
          <h2>Atajos rápidos</h2>
          <ul>
            <li>Explora nuevos compañeros compatibles con tus objetivos.</li>
            <li>Coordina sesiones semanales y registra tu progreso.</li>
            <li>Comparte tus rutinas favoritas con la comunidad.</li>
          </ul>
        </div>
      </section>

      <section className="member-grid">
        <div className="member-grid-item">
          <img src={card1} alt="Red de gymbros" />
          <div className="member-grid-text">
            <h3>Comunidad Activa</h3>
            <p>Encuentra perfiles similares al tuyo y arma duplas que potencien tu rendimiento.</p>
          </div>
        </div>
        <div className="member-grid-item">
          <img src={saltoCuerda} alt="Entrenamientos personalizados" />
          <div className="member-grid-text">
            <h3>Planes Flexibles</h3>
            <p>Agenda sesiones en los horarios que mejor se adapten a tu rutina diaria.</p>
          </div>
        </div>
        <div className="member-grid-item">
          <img src={box} alt="Nuevos objetivos" />
          <div className="member-grid-text">
            <h3>Metas Claras</h3>
            <p>Define objetivos concretos y visualiza cómo progresas semana a semana.</p>
          </div>
        </div>
      </section>
    </>
  );
}

export default MemberHome;
