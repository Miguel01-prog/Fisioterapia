import React from "react";
import { useForm } from "react-hook-form";
import "./RegisterPages.css"; // Importamos los estilos

function RegisterPages() {
  const { register, handleSubmit } = useForm();

  return (
    <div className="auth-page">
        <div className="background-shapes">
        <div className="shape shape-1"></div>
        <div className="shape shape-2"></div>
        <div className="shape shape-3"></div>
        <div className="shape shape-4"></div>
      </div>
      <div className="auth-container">
        <div className="auth-card-wrapper">
            <div className="auth-card">
                <form
                    className="auth-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="firstName" className="form-label">
                            Nombre
                        </label>
                        <input type="text" {...register("username", { required: true })} placeholder="Username" />
                    </div>
                        <input type="email" {...register("email", { required: true })} placeholder="Email" />
                        <input type="password" {...register("password", { required: true })} placeholder="Password" />
                        <button type="submit">Registrarte</button>
                </form>
            </div>
        </div>
      </div>
    </div>
  );
}

export default RegisterPages;
