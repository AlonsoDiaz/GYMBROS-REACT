import { Outlet, Link, useNavigate } from "react-router-dom";
import { useCallback } from "react";
import useAuthUser from "./hooks/useAuthUser";
import { clearAuthUser } from "./utils/authStorage";

function Layout() {
  const navigate = useNavigate();
  const user = useAuthUser();

  const handleLogout = useCallback(() => {
    clearAuthUser();
    navigate("/");
  }, [navigate]);

  const shortName = user?.nombre ? user.nombre.split(" ")[0] : null;

  return (
    <>
      <header className="navbar">
        <div className="navbar-container">
          <div className="logo">GYMBROS</div>
          <nav>
            <ul className="nav-links">
              <li><Link to="/">INICIO</Link></li>
              <li><Link to="/contacto">CONTACTO</Link></li>
              {user ? (
                <>
                  <li><Link to="/panel">MI ESPACIO</Link></li>
                  <li className="nav-welcome">Hola, {shortName || "Gymbro"}</li>
                  <li><button type="button" onClick={handleLogout}>SALIR</button></li>
                </>
              ) : (
                <>
                  <li><Link to="/registro">REGISTRATE!</Link></li>
                  <li><Link to="/login">LOGIN</Link></li>
                </>
              )}
            </ul>
          </nav>
        </div>
      </header>
      <main>
        <Outlet />
      </main>
      <footer className="footer">
        <div>
          <span>Correo: contacto@gymbro.com</span> |
          <span> © 2025 GYMBRO. Todos los derechos reservados.</span>
        </div>
      </footer>
    </>
  );
}

export default Layout;
