import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/carrito.css";

import { Navbar } from "../component/navbar.js";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const Carrito = () => {
  const { store, actions } = useContext(Context);
  let navigate = useNavigate();

  useEffect(() => {
    actions.getCarrito();
    store.carrito;
    actions.getTotal();
  }, []);

//   useEffect(() =>{
//  actions.setTotal();
//   }, [store.total])

  const deleteClick = (storeId, price) => {
    toast.error("Se ha elminado el producto!", {
      position: "bottom-left",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
    });
    let Total;
    if(store.total-price<0){
       Total= 0
    }else{
       Total = store.total - price;
    }
    actions.setTotal(Total);
    actions.deleteCarritoItem(storeId);
  };

  const deleteCarrito = () => {
    toast.error("Se ha elminado el Carrito completo", {
      position: "bottom-left",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
    });
    actions.deleteCarrito();
  };

  return (
    <>
      <Navbar />
      <div className="container align-items-center mt-3">
        <div className="col m-auto">
          <div className="text-center">
            <h2>Finalizar orden de preparación</h2>
            <p className="lead">Tu orden de preparación es la siguiente:</p>
          </div>

          <div className="row g-5">
            <div className="col-xs-4 md-8 col-lg-12  order-md-last">
              <h4 className=" justify-content-between mb-3">
                <span className="text-primary">Tus productos: </span>
                <span className="badge bg-success rounded-pill">
                  {store.carrito.length}
                </span>
              </h4>
              <ul className="list-group mb-3">
                {store.carrito.length > 0 &&
                  store.carrito.map((item) => {
                    return (
                      <>
                        <li className="list-group-item d-flex justify-content-between lh-sm">
                          <div key={item.id}>
                            <h6 className="my-0">{item.name}</h6>
                            <small className="text">{item.description}</small>
                          </div>
                          <span className="text">€ {item.price}</span>
                          <button
                            type="button"
                            className="btn-close"
                            onClick={(e) => {
                              deleteClick(item.storeId, item.price);
                            }}
                          ></button>
                        </li>
                      </>
                    );
                  })}

                <li className="list-group-item d-flex justify-content-between">
                  <span>Total (EUR)</span>
                  <strong>$ {store.total}</strong>
                </li>
              </ul>
              <Link to="/checkout">
                <div className="d-grid gap-2">
                  <button
                    className="btn btn-success btn-lg mt-3 mb-3 "
                    type="submit"
                  >
                    Pagar
                  </button>
                </div>
              </Link>
            </div>
          </div>
        </div>
        
      </div>
      <ToastContainer
        position="bottom-left"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
     <div className="d-grid gap-2">
                  <button
                    className="button1 btn-lg mt-3 mb-3 "
                    onClick={deleteCarrito}
                  >
                    Eliminar Carrito
                  </button>
    </div>
    </>
  );
};
