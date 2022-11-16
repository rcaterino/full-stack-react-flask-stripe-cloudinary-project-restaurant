import React, { useEffect, useContext, useState } from "react";
import { Context } from "../../store/appContext";

import { NavbarAdmin } from "../../component/easyrestaurant/navbarAdmin";
import { FooterEasy } from "../../component/easyrestaurant/footer";
import { Button, Checkbox, Form } from 'semantic-ui-react'

export const Alergenos = () => {
  const { store, actions } = useContext(Context);
  const [alergeno, setAlergeno] = useState("");

  useEffect(() => {
    actions.getAlergenos();
    store.alergenos;
  }, []);

  function deleteAllergens(id) {
    actions.deleteAllergen(id);
  }
  function handleClick() {
    actions.postAllergen(alergeno);
  }

  return (
    <>
      <Form>
        <Form.Field>
          <div className="col">
            <h2>Alérgenos</h2>
            <p className="lead">
              Para mejorar la experiencia de compra del usuario, podemos
              crear alergenos que luego podremos incluir en los platos de la
              carta. De esta manera, si el cliente los incluye en su perfil,
              la aplicación le avisará cuando intente pedir un producto que
              puede ser perjudicial para su salud.
            </p>
          </div>
          <label className="form-label">Descripción</label>
                  <input
                    type="text"
                    className="form-control"
                    id="description"
                    placeholder="Introduce Nombre descriptivo de un alergeno para ser incluido en sistema"
                    value={alergeno}
                    onChange={(e) => {
                      setAlergeno(e.target.value);
                    }}
                  />
        </Form.Field>
        <Form.Field>
        <button
                className="btn btn-primary btn-lg mt-3 mb-3"
                type="submit"
                onClick={handleClick}
              >
                Agregar Alergeno
              </button>
        </Form.Field>
        <Form.Field>
        <div className="container">
                <table className="table">
                  <thead>
                    <tr>
                      <th scope="col">Descripción</th>
                      <th scope="col">Eliminar</th>
                    </tr>
                  </thead>
                  <tbody>
                    {store.alergenos?.map((alergeno) => (
                      <>
                        <tr>
                          <td scope="row">{alergeno.description}</td>
                          <td scope="row">
                            <button
                              type="button"
                              className="btn-close"
                              onClick={(e) => {
                                const alergenoToDelete = alergeno.id;
                                deleteAllergens(alergenoToDelete);
                              }}
                            ></button>
                          </td>
                        </tr>
                      </>
                    ))}
                  </tbody>
                </table>
              </div>
        </Form.Field>
      </Form>


      <FooterEasy />
    </>
  );
};
