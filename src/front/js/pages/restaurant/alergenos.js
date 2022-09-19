import React, { useEffect, useContext, useState } from "react";
import { Context } from "../../store/appContext";
import { NavbarAdmin } from "../../component/navbarAdmin";

export const Alergenos = () => {
  const { store, actions } = useContext(Context);

  useEffect(() => {
    actions.getAlergenos();
    store.alergenos;
  }, []);

  return (
    <>
      <NavbarAdmin />
      <div className="bg-light">
        <div className="container align-items-center">
          <div>
            <div className="col py-5">
              <h2>Alergenos</h2>
              <p className="lead">
                Para mejorar la experiencia de compra del usuario, podemos crear
                alergenos que luego podremos incluir en los platos de la carta.
                De esta manera, si el cliente los inckluye en su perfil, la
                aplicación le avisará cuando intente pedir un producto que puede
                ser perjudicial para su salud.
              </p>
            </div>
            <form>
              <div className="col align-items-center">
                <label class="form-label">Descripción</label>
                <input
                  type="text"
                  className="form-control"
                  id="firstName"
                  placeholder="Introduce Nombre descriptivo de un alergeno para ser incluido en sistema"
                  value=""
                />
              </div>
            </form>
            <button className="btn btn-primary btn-lg mt-3 mb-3" type="submit">
              Agregar Alergeno
            </button>
            <div className="container">
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">ID</th>
                    <th scope="col">Descripción</th>
                    <th scope="col">Eliminar</th>
                  </tr>
                </thead>
                <tbody>
                  {store.alergenos?.map((alergeno) => (
                    <>
                      <tr>
                        <th scope="row">{alergeno.id}</th>
                        <td scope="row">{alergeno.description}</td>
                        <td scope="row">
                          <button type="button" class="btn-close"></button>
                        </td>
                      </tr>
                    </>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
