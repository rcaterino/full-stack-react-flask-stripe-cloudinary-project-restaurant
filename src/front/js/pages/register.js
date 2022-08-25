import React, { useContext } from "react";

import { Context } from "../store/appContext";

export const Register = () => {
  const { store, actions } = useContext(Context);

  return (
    <div className="p-3 border-0">
      <h1 className="text-center">Formulario de Registro</h1>
      <div className="d-grid gap-2">
        <label className="form-label">Nombre</label>
        <div className="d-grid gap-2">
          <input
            type="text"
            className="form-control"
            placeholder="Indique su nombre"
          />
        </div>
      </div>
      <div className="d-grid gap-2">
        <label className="form-label">Apellidos</label>
        <div className="d-grid gap-2">
          <input
            type="text"
            className="form-control"
            placeholder="Indique sus Apellidos"
          />
        </div>
      </div>
      <div className="d-grid gap-2">
        <label className="form-label">Correo Electrónico</label>
        <div className="d-grid gap-2">
          <input
            type="email"
            className="form-control"
            placeholder="Escriba su correo electrónico"
          />
        </div>
      </div>
      <div className="d-grid gap-2">
        <label className="form-label">Confirmar correo electrónico</label>
        <div className="d-grid gap-2">
          <input
            type="email"
            className="form-control"
            placeholder="por favor vuelva a escribir su correo electrónico"
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
          Registrarme
        </button>
      </div>
    </div>
  );
};
