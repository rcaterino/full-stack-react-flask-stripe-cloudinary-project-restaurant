import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";

export const Menu = () => {
  const { store, actions } = useContext(Context);

  useEffect(() => {
    actions.getCarta();
  }, []);

  return (
    <>
      {!store.category ||
      store.category === null ||
      store.category === "" ||
      store.category === undefined ? (
        <div>
          <h1>Hola soy el menú</h1>
          <p>No existen categorías asociadas al menú</p>
        </div>
      ) : (
        <div>
          <h1>Hola soy el menú</h1>
          <p>
            {store.category.map((item) => (
              <div>
                <h1>Categoría:{item.name}</h1>
                <div>
                  {store.products.map((item) => (
                    <>
                      <h1>Productos:{item.name}</h1>
                      <h1>Precio:{item.price}</h1>
                    </>
                  ))}
                </div>
              </div>
            ))}
          </p>
        </div>
      )}
    </>
  );
};
