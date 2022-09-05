import React, { useEffect, useContext } from "react";
import { Context } from "../store/appContext";

export const Menu = () => {
    const { store, actions } = useContext(Context);


    return (
        <>
            <div>
                <h1>Hola soy el menú</h1>
                {store.categories.map((category) => (
                <div>
                        <h1>Categoría:{category.name}</h1>
                     <div>    
                         {category.product.map((producto) => (
                <>
                <h3>Productos:{producto.name}</h3>
                </>
                            ))}
                    </div>
                </div>
                ))}

            </div>
        </>
    );
};
