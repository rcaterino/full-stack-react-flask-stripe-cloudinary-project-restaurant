import React, { useEffect, useContext } from "react";
import { Context } from "../store/appContext";
import {Menu} from "../component/menu";


export const Products = (props) => {
    const { store, actions } = useContext(Context);
    useEffect(() => {
        
      }, []);

    return (
        <div>
            {/* {
                store.products.map((item) => (
                    <h1>products:{item.name}</h1>))
            } */}
            <h1>{props.categorias}</h1>

        </div>

    )
}