import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Eye, EyeOff } from "lucide-react"; // Iconos de contraseña
import "./RegisterPages.css"; // Estilos
import '../index.css'; // Estilos globales
import { registerReq } from "../api/auth";

function RegisterPages() {
  const { register, handleSubmit } = useForm();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data) => {
    console.log("Datos del formulario enviados al backend:", data); // Verifica los datos que se están enviando
    try {
      const userData = {
        nombreUsuario: data.nombreUsuario,
        apellidosUsuario: data.apellidosUsuario, // Asegúrate de enviar apellidosUsuario
        emailUsuario: data.email, // Cambia 'email' por 'emailUsuario'
        contrasenaUsuario: data.password, // Cambia 'password' por 'contrasenaUsuario'
      };
      const res = await registerReq(userData);
      console.log(res.data); // Respuesta de la API
      setIsLoading(true);

      setTimeout(() => {
        setIsLoading(false);
        alert("Cuenta creada con éxito!");
      }, 1500);
    } catch (error) {
      setIsLoading(false);
      console.error("Error al registrar el usuario:", error);
      alert("Hubo un error al crear la cuenta. Intenta nuevamente.");
    }
  };

  return (
    <div className="auth-page">
      <div className=".background-shapes">
        <div className="shape shape-1"></div>
        <div className="shape shape-2"></div>
        <div className="shape shape-3"></div>
        <div className="shape shape-4"></div>
      </div>
      <div className="auth-container">
        <div className="auth-card-wrapper">
          <div className="auth-card">
            <form className="auth-form" onSubmit={handleSubmit(onSubmit)}>
              <div className="form-group">
                <label htmlFor="nombreUsuario" className="form-label">
                  Nombre
                </label>
                <input
                  type="text"
                  id="nombreUsuario"
                  {...register("nombreUsuario", { required: true })}
                  placeholder="Nombre Completo"
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label htmlFor="apellidosUsuario" className="form-label">
                  Apellidos
                </label>
                <input
                  type="text"
                  id="apellidosUsuario"
                  {...register("apellidosUsuario", { required: true })}
                  placeholder="Apellidos"
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label htmlFor="email" className="form-label">
                  Correo
                </label>
                <input
                  type="email"
                  id="email"
                  {...register("email", { required: true })}
                  placeholder="Correo"
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label htmlFor="password" className="form-label">
                  Contraseña
                </label>
                <div className="password-input-container">
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    {...register("password", { required: true })}
                    placeholder="••••••••"
                    className="form-input"
                  />
                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="password-icon" />
                    ) : (
                      <Eye className="password-icon" />
                    )}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className={`auth-submit ${isLoading ? "loading" : ""}`}
                disabled={isLoading}
              >
                {isLoading ? "Creando cuenta..." : "Crear cuenta"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegisterPages;
