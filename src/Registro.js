import { Link } from "react-router-dom";
import { useState } from "react";

function Registro() {
  const [form, setForm] = useState({
    nombre: "",
    apellido: "",
    correo: "",
    password: ""
  });
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState("");

  // Validaciones
  const validateField = (name, value) => {
    let error = "";
    if (name === "nombre" || name === "apellido") {
      const regex = /^[a-zA-ZÀ-ÿ\s]{3,}$/;
      if (!regex.test(value.trim())) {
        error = "Debe tener al menos 3 letras y solo caracteres válidos.";
      }
    }
    if (name === "correo") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value.trim())) {
        error = "Por favor, ingresa un correo válido.";
      }
    }
    if (name === "password") {
      // Permite cualquier símbolo, no solo @$!%*?&
      const passRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z\d]).{6,}$/;
      if (!passRegex.test(value.trim())) {
        error = "La contraseña debe tener mínimo 6 caracteres, una mayúscula, una minúscula, un número y un símbolo.";
      }
    }
    return error;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    setErrors({ ...errors, [name]: validateField(name, value) });
    setSuccess("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};
    Object.keys(form).forEach((key) => {
      const error = validateField(key, form[key]);
      if (error) newErrors[key] = error;
    });
    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      setSuccess("✅ Formulario enviado con éxito.");
      setForm({ nombre: "", apellido: "", correo: "", password: "" });
    }
  };

  return (
    <>
      <header className="navbar">
        <div className="navbar-container">
          <div className="logo">GYMBROS</div>
          <nav>
            <ul className="nav-links">
              <li><Link to="/">INICIO</Link></li>
              <li><Link to="/contacto">CONTACTO</Link></li>
              <li><Link to="/registro">REGISTRATE!</Link></li>
            </ul>
          </nav>
        </div>
      </header>
      <section className="contacto-section">
        <div className="contacto-container">
          <h1>REGISTRATE!</h1>
          <p className="contacto-descripcion">
            Crea tu cuenta y encontrá tu Gymbro/Gymsis para entrenar juntos. 🏋️‍♂️💪
          </p>
          <form className="contacto-form" onSubmit={handleSubmit} noValidate>
            <input
              type="text"
              name="nombre"
              placeholder="Nombre"
              value={form.nombre}
              onChange={handleChange}
              required
              className={errors.nombre ? "error" : form.nombre ? "success" : ""}
            />
            {errors.nombre && <small className="error-msg">{errors.nombre}</small>}
            <input
              type="text"
              name="apellido"
              placeholder="Apellido"
              value={form.apellido}
              onChange={handleChange}
              required
              className={errors.apellido ? "error" : form.apellido ? "success" : ""}
            />
            {errors.apellido && <small className="error-msg">{errors.apellido}</small>}
            <input
              type="email"
              name="correo"
              placeholder="Correo"
              value={form.correo}
              onChange={handleChange}
              required
              className={errors.correo ? "error" : form.correo ? "success" : ""}
            />
            {errors.correo && <small className="error-msg">{errors.correo}</small>}
            <input
              type="password"
              name="password"
              placeholder="Contraseña"
              value={form.password}
              onChange={handleChange}
              required
              minLength={6}
              className={errors.password ? "error" : form.password ? "success" : ""}
            />
            {errors.password && <small className="error-msg">{errors.password}</small>}
            <button type="submit">Registrarme</button>
            {success && <div className="form-success" style={{ color: "lime", marginTop: "12px" }}>{success}</div>}
          </form>
        </div>
      </section>
    </>
  );
}
export default Registro;