import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";

export const Menu = () => {
  const { store, actions } = useContext(Context);

  useEffect(() => {
    actions.getCarta();
  }, []);

  return (
    <>
      <div>
        <h1>Hola soy el menú</h1>
        <p>
          {store.category.map((item) => (
            <div>
              <h1>Categoría:{item.name}</h1>
              <div>
                {store.products.map((item) => (
                  <>
                    <h3>Productos:{item.name}</h3>
                    <h5>Precio:{item.price}</h5>
                  </>
                ))}
              </div>
            </div>
          ))}
        </p>
      </div>
    </>
  );
};
