import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { apiPost } from "./api/apiClient";
import { saveAuthUser } from "./utils/authStorage";

function Login() {
  const [form, setForm] = useState({
    correo: "",
    password: ""
  });
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState("");
  const [serverError, setServerError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/panel";

  const validateField = (name, value) => {
    let error = "";
    if (name === "correo") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value.trim())) {
        error = "Por favor, ingresa un correo válido.";
      }
    }
    if (name === "password") {
      if (value.trim().length < 6) {
        error = "La contraseña debe tener al menos 6 caracteres.";
      }
    }
    return error;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: validateField(name, value) }));
    setSuccess("");
    setServerError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};
    Object.keys(form).forEach((key) => {
      const error = validateField(key, form[key]);
      if (error) newErrors[key] = error;
    });
    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      setLoading(true);
      setServerError("");
      try {
        const payload = {
          correo: form.correo.trim().toLowerCase(),
          password: form.password
        };
        const response = await apiPost("/auth/login", payload);
        saveAuthUser(response);
        setSuccess(response.mensaje || "✅ Inicio de sesión exitoso.");
        setForm({ correo: "", password: "" });
        navigate(from, { replace: true });
      } catch (error) {
        setServerError(error.message || "No fue posible iniciar sesión.");
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <section className="contacto-section">
      <div className="contacto-container">
        <h1>Iniciá Sesión</h1>
        <p className="contacto-descripcion">
          Accedé a tu cuenta y reencontrate con tus Gymbros. 🏋️‍♀️🔥
        </p>
        <form className="contacto-form" onSubmit={handleSubmit} noValidate>
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
            className={errors.password ? "error" : form.password ? "success" : ""}
          />
          {errors.password && <small className="error-msg">{errors.password}</small>}
          <button type="submit" disabled={loading}>
            {loading ? "Ingresando..." : "Ingresar"}
          </button>
          {serverError && <div className="error-msg" style={{ textAlign: "center" }}>{serverError}</div>}
          {success && <div className="form-success">{success}</div>}
        </form>
      </div>
    </section>
  );
}

export default Login;
