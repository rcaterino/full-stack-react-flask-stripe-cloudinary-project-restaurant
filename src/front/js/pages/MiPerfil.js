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
    <>
    
      {!store.token ||
      store.token === null ||
      store.token === "" ||
      store.token === undefined ? (
        <div className="container">
          <h1>Hola Usuario</h1>
          <p>Estás en tu página de perfil</p>
         
      
        </div>
      ) : (
        <div className="container">
          <h1>Hola Usuario</h1>
          <p>Estás en tu página de perfil</p>

          <p>{store.user_data?.name}</p>
          <p>{store.user_data?.lastname}</p>
          <p>{store.user_data?.birtday}</p>
          <p>{store.user_data?.phone}</p>
          <p>{store.address?.address}</p>

        </div>
      )}
    </>
  );
};
