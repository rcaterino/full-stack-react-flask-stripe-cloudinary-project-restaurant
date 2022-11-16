import React, { useEffect, useContext, useState } from "react";
import { Context } from "../../store/appContext";
import { Button, Checkbox, Form } from 'semantic-ui-react'
import { FooterEasy } from "../../component/easyrestaurant/footer";


export const Categorias = () => {
  const { store, actions } = useContext(Context);
  const [categoria, setCategoria] = useState("");

  useEffect(() => {
    actions.getAllCategories();
    store.categories;
  }, []);

  function deleteCategoria(id) {
    actions.deleteCategoria(id);
  }
  function handleClick() {
    actions.postCategoria(categoria);
  }
  return (
    <div >
      <Form>
        <Form.Field>
          <div className="col">
            <h2>Categorías</h2>
            <p className="lead">
              Para crear productos dentro del menú es necesario primero incluir
              categorías dentro de las cuales introducir productos.
            </p>
          </div>
          <input
            type="text"
            className="form-control"
            id="description"
            placeholder="Introduce Nombre descriptivo de la categoría "
            value={categoria}
            onChange={(e) => {
              setCategoria(e.target.value);
            }}
          />
        </Form.Field>

        <Button
          className="btn-primary"
          type="submit"
          onClick={handleClick}
        >
          Agregar Categoría
        </Button>
      </Form>
      <div>
        <h2>Listado de Categorías existentes</h2>
      </div>
      <div className="container">
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Descripción</th>
              <th scope="col">Eliminar</th>
            </tr>
          </thead>
          <tbody>
            {store.categories?.map((categoria) => (
              <>
                <tr>
                  <td scope="row">{categoria.name}</td>
                  <td scope="row">
                    <button
                      type="button"
                      className="btn-close"
                      onClick={(e) => {
                        const categoriaToDelete = categoria.id;
                        deleteCategoria(categoriaToDelete);
                      }}
                    ></button>
                  </td>
                </tr>
              </>
            ))}
          </tbody>
        </table>
      </div>
      <FooterEasy />
    </div>
  );
};
