import React, { useEffect, useContext, useState } from "react";
import { Context } from "../store/appContext";
import { Link, useNavigate } from "react-router-dom";

export const OrderDetail = () => {
  const { store, actions } = useContext(Context);
  const [order, setOrder] = useState(false);

  const deleteCarrito = () => {
    actions.deleteCarrito();
  };

  useEffect(() => {
    store.order_detail;
    if (store.order_detail.length > 0) setOrder(true);
  }, [order]);

  console.log(store.order_detail);
  return (
    <div>
      <table className="table  ">
        <thead>
          <tr>
            <th scope="col"></th>
            <th scope="col">Producto</th>
            <th scope="col">Precio</th>
            <th scope="col">Cantidad</th>
          </tr>
        </thead>
        <tbody>
          {store.order_detail.order_detail?.map((index, i) => (
            <tr>
              <th scope="row"></th>
              <td>{index.product_name}</td>
              <td>€{index.subtotal}</td>
              <td>X{index.units}</td>
            </tr>
          ))}
          <tr className="total ">
            <th scope="row"></th>
            <td>TOTAL</td>
            <td>€{store.order_detail.order_total}</td>
            <td></td>
          </tr>
        </tbody>
      </table>
      <Link to="/">
        <div className="d-flex justify-content-center">
          <button
          onClick={deleteCarrito}
            className="button3"
            type="submit"
          >
            <span></span>
            Volver al menu
          </button>
        </div>
      </Link>
    </div>
  );
};
