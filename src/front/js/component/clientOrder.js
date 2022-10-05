import React, { useEffect, useContext, useState } from "react";
import { Context } from "../store/appContext";

export const OrderDetail = () => {
  const { store, actions } = useContext(Context);
  const [order, setOrder] = useState(false);

  useEffect(() => {
    store.order_detail;
    if (store.order_detail.length > 0) setOrder(true);
  }, [order]);

  console.log(store.order_detail);
  return (
    <div>
      <h3>Detalles de Su pedido</h3>
        <div>
          <p>{store.order_detail.client}</p>
          <p>{store.order_detail.order_id}</p>
        </div>
    </div>
  );
};
