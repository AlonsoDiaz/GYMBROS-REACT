import { useEffect, useState } from "react";
import { apiPost, apiGet } from "./api/apiClient";

const initialFormState = {
  nombre: "",
  edad: "",
  genero: "",
  correo: "",
  password: "",
  tiempoGim: "",
  objetivo: "",
  horario: "",
  frecuenciaSem: "",
  idGimnasio: "",
  bio: "",
  instagram: ""
};

function Registro() {
  const [form, setForm] = useState(initialFormState);
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState("");
  const [serverError, setServerError] = useState("");
  const [loading, setLoading] = useState(false);
  const [gyms, setGyms] = useState([]);
  const [gymsError, setGymsError] = useState("");
  const [gymsLoading, setGymsLoading] = useState(false);

  useEffect(() => {
    let isMounted = true;
    const fetchGyms = async () => {
      setGymsLoading(true);
      setGymsError("");
      try {
        const data = await apiGet("/gimnasios");
        if (isMounted) {
          setGyms(data);
        }
      } catch (error) {
        if (isMounted) {
          setGymsError("No pudimos cargar la lista de gimnasios. Intenta nuevamente más tarde.");
        }
      } finally {
        if (isMounted) {
          setGymsLoading(false);
        }
      }
    };

    fetchGyms();
    return () => {
      isMounted = false;
    };
  }, []);

  // Validaciones
  const validateField = (name, value) => {
    let error = "";
    if (name === "nombre") {
      const regex = /^[a-zA-ZÀ-ÿ\s]{3,}$/;
      if (!regex.test(value.trim())) {
        error = "Debe tener al menos 3 letras y solo caracteres válidos.";
      }
    }
    if (name === "edad") {
      const numero = Number(value);
      if (!Number.isInteger(numero) || numero < 15 || numero > 99) {
        error = "Ingresa una edad válida entre 15 y 99.";
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
    if (name === "frecuenciaSem" && value) {
      const numero = Number(value);
      if (!Number.isInteger(numero) || numero < 0 || numero > 14) {
        error = "Ingresa una frecuencia válida (0 a 14).";
      }
    }
    if (name === "idGimnasio" && value) {
      const numero = Number(value);
      if (!Number.isInteger(numero) || numero <= 0) {
        error = "Selecciona un gimnasio válido.";
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
          nombre: form.nombre.trim(),
          edad: Number(form.edad),
          genero: form.genero || null,
          correo: form.correo.trim().toLowerCase(),
          password: form.password,
          tiempoGim: form.tiempoGim || null,
          objetivo: form.objetivo || null,
          horario: form.horario || null,
          frecuenciaSem: form.frecuenciaSem ? Number(form.frecuenciaSem) : null,
          idGimnasio: form.idGimnasio ? Number(form.idGimnasio) : null,
          bio: form.bio || null,
          instagram: form.instagram || null
        };

        const response = await apiPost("/auth/register", payload);
        setSuccess(response.mensaje || "✅ Registro exitoso.");
        setForm(initialFormState);
        setErrors({});
      } catch (error) {
        setServerError(error.message || "Ocurrió un error al registrarte.");
      } finally {
        setLoading(false);
      }
    }
  };

  return (
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
            type="number"
            name="edad"
            placeholder="Edad"
            value={form.edad}
            onChange={handleChange}
            required
            min={15}
            max={99}
            className={errors.edad ? "error" : form.edad ? "success" : ""}
          />
          {errors.edad && <small className="error-msg">{errors.edad}</small>}
          <select
            name="genero"
            value={form.genero}
            onChange={handleChange}
            className={form.genero ? "success" : ""}
          >
            <option value="">Género (opcional)</option>
            <option value="M">Masculino</option>
            <option value="F">Femenino</option>
            <option value="Otro">Otro</option>
          </select>
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
          <input
            type="text"
            name="tiempoGim"
            placeholder="Tiempo entrenando (opcional)"
            value={form.tiempoGim}
            onChange={handleChange}
          />
          <input
            type="text"
            name="objetivo"
            placeholder="Objetivo (opcional)"
            value={form.objetivo}
            onChange={handleChange}
          />
          <select
            name="horario"
            value={form.horario}
            onChange={handleChange}
            className={form.horario ? "success" : ""}
          >
            <option value="">Horario preferido (opcional)</option>
            <option value="Mañana">Mañana</option>
            <option value="Tarde">Tarde</option>
            <option value="Noche">Noche</option>
          </select>
          <input
            type="number"
            name="frecuenciaSem"
            placeholder="Sesiones por semana (opcional)"
            value={form.frecuenciaSem}
            onChange={handleChange}
            min={0}
            max={14}
            className={errors.frecuenciaSem ? "error" : form.frecuenciaSem ? "success" : ""}
          />
          {errors.frecuenciaSem && <small className="error-msg">{errors.frecuenciaSem}</small>}
          <select
            name="idGimnasio"
            value={form.idGimnasio}
            onChange={handleChange}
            className={errors.idGimnasio ? "error" : form.idGimnasio ? "success" : ""}
          >
            <option value="">Selecciona tu gimnasio (opcional)</option>
            {gyms.map((gym) => (
              <option key={gym.id} value={gym.id}>
                {gym.nombre}
              </option>
            ))}
          </select>
          {gymsLoading && <small className="info-msg">Cargando gimnasios...</small>}
          {gymsError && <small className="error-msg">{gymsError}</small>}
          {errors.idGimnasio && <small className="error-msg">{errors.idGimnasio}</small>}
          <textarea
            name="bio"
            placeholder="Bio (opcional)"
            value={form.bio}
            onChange={handleChange}
            rows={3}
          />
          <input
            type="text"
            name="instagram"
            placeholder="Instagram (opcional)"
            value={form.instagram}
            onChange={handleChange}
          />
          <button type="submit" disabled={loading}>
            {loading ? "Registrando..." : "Registrarme"}
          </button>
          {serverError && <div className="error-msg" style={{ textAlign: "center" }}>{serverError}</div>}
          {success && <div className="form-success">{success}</div>}
        </form>
      </div>
    </section>
  );
}

export default Registro;