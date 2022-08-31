import React, { useEffect, useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";



export const Miperfil = () => {
    const { store, actions } = useContext(Context);

  /* utilizamos useEffect para optener del actions en flux.js el token del usuario con la función getTokenFromSession*/
  useEffect(() => {
    actions.getTokenFromSession();
  }, []);


    return (
        <div className="container">
            <h1>Hola Usuario</h1>
            <p>Estás en tu página de perfil</p>
        </div>
    );
};