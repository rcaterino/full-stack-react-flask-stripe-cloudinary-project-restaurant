import React, { useEffect, useContext, useState } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import UserNavBar from "../component/usernavbar";

export const Miperfil = () => {
  const { store, actions } = useContext(Context);
  const [nombre, setNombre] = useState(store.user_data?.name);
  const [apellidos, setApellidos] = useState(store.user_data?.lastname);
  const [birthday, setBirthday] = useState(store.user_data?.birthday);
  const [phone, setPhone] = useState(store.user_data?.phone);
  const [email, setEmail] = useState(store.user_data?.email);

  /* utilizamos useEffect para optener del actions en flux.js el token del usuario con la función getTokenFromSession*/
  useEffect(() => {
    actions.getTokenFromSession();
  }, []);

  return (
    <div>
      <UserNavBar />
      <div className="p-3 border-0">
        <h1 className="text-center">Formulario de Registro</h1>
        <div className="d-grid gap-2">
          <label className="form-label">Nombre</label>
          <div className="d-grid gap-2">
            <input
              type="text"
              className="form-control"
              placeholder="Indique su nombre"
              value={nombre}
              onChange={(e) => {
                setNombre(e.target.value);
              }}
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
              value={apellidos}
              onChange={(e) => {
                setApellidos(e.target.value);
              }}
            />
          </div>
        </div>
        <div
          class="d-grid gap-2"
          data-date="12-02-2012"
          data-date-format="dd-mm-yyyy"
        >
          <label className="form-label">Cumpleaños</label>
          <div className="d-grid gap-2">
            <input
              className="form-control"
              type="date"
              value={birthday}
              onChange={(e) => {
                setBirthday(e.target.value);
              }}
            />
          </div>
        </div>

        <div className="d-grid gap-2">
          <label className="form-label">Número telefónico</label>
          <div className="d-grid gap-2">
            <input
              type="tel"
              className="form-control"
              placeholder="Escriba su número telefónico"
              value={phone}
              onChange={(e) => {
                setPhone(e.target.value);
              }}
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
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </div>
        </div>
        {/* <div className="mb-3">
        <label className="col-sm-2 col-form-label">Contraseña</label>
        <div className="d-grid gap-2">
          <input
            type="password"
            className="form-control"
            placeholder="Por favor, escriba su contraseña"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </div>
      </div> */}
        <div className="d-grid gap-2">
          <button type="submit" className="btn btn-primary">
            Guardar
          </button>
        </div>
      </div>

      {/* //   <p>{store.user_data?.name}</p>
        //   <p>{store.user_data?.lastname}</p>
        //   <p>{store.user_data?.birtday}</p>
        //   <p>{store.user_data?.phone}</p>
        //   <p>{store.address?.address}</p>

        //  */}
    </div>
  );
};
