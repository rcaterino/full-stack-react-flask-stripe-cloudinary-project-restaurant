import React, { useEffect, useContext } from "react";
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
          {store.category.map((categoria) => (
            <div>
              <h1>Categoría:{categoria.name}</h1>
              <div>
                {categoria.product.map((producto) => (
                  <>
                    <h3>Productos:{producto.name}</h3>
                    <h5>Precio:{producto.price}</h5>
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
