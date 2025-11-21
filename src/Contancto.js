import { useState } from "react";

function Contacto() {
  const [form, setForm] = useState({
    nombre: "",
    correo: "",
    mensaje: ""
  });
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState("");

  // Validaciones
  const validateField = (name, value) => {
    let error = "";
    if (name === "nombre") {
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
    if (name === "mensaje") {
      if (value.trim().length < 10) {
        error = "El mensaje debe tener al menos 10 caracteres.";
      }
    }
    return error;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: validateField(name, value) }));
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
      setSuccess("✅ Mensaje enviado con éxito.");
      setForm({ nombre: "", correo: "", mensaje: "" });
    }
  };

  return (
    <section className="contacto-section">
        <div className="contacto-container">
          <h1>¡Contáctanos!</h1>
          <p className="contacto-descripcion">
            ¿Tenés alguna duda o querés hacer un reporte?<br /><br />
            Completá el formulario y te responderemos a la brevedad. 💪✨
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
              type="email"
              name="correo"
              placeholder="Correo"
              value={form.correo}
              onChange={handleChange}
              required
              className={errors.correo ? "error" : form.correo ? "success" : ""}
            />
            {errors.correo && <small className="error-msg">{errors.correo}</small>}
            <textarea
              name="mensaje"
              placeholder="Mensaje"
              value={form.mensaje}
              onChange={handleChange}
              required
              className={errors.mensaje ? "error" : form.mensaje ? "success" : ""}
            />
            {errors.mensaje && <small className="error-msg">{errors.mensaje}</small>}
            <button type="submit">Enviar</button>
            {success && <div className="form-success" style={{ color: "lime", marginTop: "12px" }}>{success}</div>}
          </form>
        </div>
      </section>
  );
}

export default Contacto;
