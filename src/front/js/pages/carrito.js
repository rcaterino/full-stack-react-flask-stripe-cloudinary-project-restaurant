import React, { useEffect, useContext, useState } from "react";
import { Context } from "../store/appContext";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Navbar } from "../component/navbar";

export const Carrito = () => {
  const { store, actions } = useContext(Context);

  useEffect(() => {
    actions.getCarrito();
    console.log("useEffect");
    console.log(store.carrito);
  }, []);

  const deleteClick = (storeId) => {
    actions.deleteCarritoItem(storeId);
  };

  const deleteCarrito = () => {
    actions.deleteCarrito();
  };

  return (
    <div>
      <Navbar />
      <div
        className="text-center mt-5 d-flex overflow-scroll"
        style={{ overflow: "auto", whiteSpace: "nowrap" }}
      >
        <>
          {store.carrito.length > 0 &&
            store.carrito.map((item, k) => {
              return (
                <div key={k}>
                  <Card style={{ width: "18rem" }}>
                    <Card.Img variant="top" src="holder.js/100px180" />
                    <Card.Body>
                      <Card.Title>
                        <div>
                          <h3>{item.name}</h3>
                        </div>
                      </Card.Title>
                      <Card.Text></Card.Text>
                      <Button onClick={() => deleteClick(item.storeId)}>
                        eliminar producto
                      </Button>
                    </Card.Body>
                  </Card>
                </div>
              );
            })}
        </>
      </div>
      <Button onClick={deleteCarrito} className="BotonCarrito">
        eliminar Carrito
      </Button>
    </div>
  );
};
