import React, { useEffect, useContext, useState } from "react";
import { Context } from "../store/appContext";
import { Link, useNavigate } from "react-router-dom";
import "../../styles/Miperfil.css";
import UserNavBar from "../component/usernavbar";
import { Navbar } from "../component/navbar";
import { Footer } from "../component/footer";

export const Miperfil = () => {
  const { store, actions } = useContext(Context);
  const [nombre, setNombre] = useState(store.user_data.name);
  const [apellidos, setApellidos] = useState(store.user_data.lastname);
  const [birthday, setBirthday] = useState(store.user_data.birthday);
  const [phone, setPhone] = useState(store.user_data.phone);
  const [email, setEmail] = useState(store.user_data.email);
  let navigate = useNavigate();

  /* utilizamos useEffect para optener del actions en flux.js el token del usuario con la función getTokenFromSession*/
  useEffect(() => {
    store.user_data;
    console.log("user data consultado desde mi perfil");
    console.log(store.user_data);
  }, []);

  const handleClick = () => {
    actions.putuser(nombre, apellidos, birthday, phone, email);
  };

  return (
    <div className="Miperfil">
      <Navbar />
      {/* <UserNavBar /> */}
      <div className="form cardR m-auto">
        <h1 className="Letra text-center">Formulario de Registro</h1>
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
          className="d-grid gap-2"
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
        <div className="d-grid gap-2">
          <button type="submit" className="button1" onClick={handleClick}>
            Guardar
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
};
