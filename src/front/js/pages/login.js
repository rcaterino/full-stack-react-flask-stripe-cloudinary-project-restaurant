import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";

import { Context } from "../store/appContext";

export const Login = () => {
  const { store, actions } = useContext(Context);

  return (
    <div className=" p-3 border-0">
      <h1 className="text-center">inicio de Sesión</h1>
      <div className="d-grid gap-2">
        <label className="form-label">Correo Electrónico</label>
        <div className="d-grid gap-2">
          <input
            type="email"
            className="form-control"
            placeholder="Escriba su dirección de correo electrónico"
          />
        </div>
      </div>
      <div className="mb-3">
        <label className="col-sm-2 col-form-label">Contraseña</label>
        <div className="d-grid gap-2">
          <input
            type="password"
            className="form-control"
            placeholder="Por favor, escriba su contraseña"
          />
        </div>
      </div>
      <div className="d-grid gap-2">
        <button type="submit" className="btn btn-primary">
          Iniciar Sesión
        </button>
      </div>
      <br></br>
      <div className="d-grid gap-2 text-center">
        <span>¿No tienes una cuenta?{"   "}</span>
        <Link className="d-grid gap-2 text-center" to="/register">
          <button type="submit" className="btn btn-primary">
            Regístrate
          </button>
        </Link>
      </div>
    </div>
  );
};
