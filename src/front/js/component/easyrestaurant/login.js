import React, { useState, useEffect, useContext } from "react";
import { Context } from "../../store/appContext";
import { Link, useNavigate } from "react-router-dom";

export const LogInAdmin = () => {
  const { store, actions } = useContext(Context);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  let navigate = useNavigate();

  const handleClick = () => {
    actions.loginRestaurant(email, password);
  };
  return (
    <div className="container align-items-center">
      <div className=" col-6 p-3 m-auto border-0">
        <h1 className="text-center">Iniciar Sesión</h1>
        <div className="d-grid gap-2">
          <input
            type="email"
            className="form-control"
            placeholder="Escriba su dirección de correo electrónico"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <input
            type="password"
            className="form-control"
            placeholder="Por favor, escriba su contraseña"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <button
            type="submit"
            className="btn btn-primary"
            onClick={handleClick}
          >
            Iniciar sesión
          </button>
          <div className="d-grid gap-2 text-center">
            <span>¿No tienes una cuenta?{"   "}</span>
            <Link className="d-grid gap-2 text-center" to="/register">
              <button type="submit" className="btn btn-primary">
                Regístrate
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
