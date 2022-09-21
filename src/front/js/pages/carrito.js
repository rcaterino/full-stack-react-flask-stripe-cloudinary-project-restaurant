
import React, { useEffect, useContext, useState } from "react";
import { Context } from "../store/appContext";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Navbar } from "../component/navbar";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const Carrito = () => {
  const { store, actions } = useContext(Context);

  useEffect(() => {
    actions.getCarrito();
    console.log("useEffect");
    console.log(store.carrito);
  }, []);

  const deleteClick = (storeId) => {
    toast.error('Se ha elminado el producto!', {
      position: "bottom-left",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
    });
    actions.deleteCarritoItem(storeId);
  }

  const deleteCarrito = () => {
    actions.deleteCarrito();
  }



  return (
    <div>
      <Navbar />
      <div className="row row-cols-1 row-cols-md-2 g-4 text-center mt-5 d-flex " >
        <>
          {store.carrito.length > 0 && store.carrito.map((item, k) => {
            return (
              <div key={k} >
                <div className="card mb-3" style={{ maxWidth: "540px" }}>
                  <div className="row g-0">
                    <div className="col-md-4">
                      <img src="https://media.istockphoto.com/photos/cheesy-pepperoni-pizza-picture-id938742222?k=20&m=938742222&s=612x612&w=0&h=X5AlEERlt4h86X7U7vlGz3bDaDDGQl4C3MuU99u2ZwQ=" className="img-fluid rounded-start" alt="..." />
                    </div>
                    <div className="col-md-6">
                      <div className="card-body">
                        <h5 className="card-title">{item.name}</h5>
                        <p className="card-text">{item.description}</p>
                        <p className="card-text">${item.price}</p>
                      </div>
                    </div>
                    <div className="col-md-2">
                      <button className="cssbuttons-io-button" onClick={() => deleteClick(item.storeId)}>
                        <i className="fa-solid fa-x"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>)
          })}
        </>
      </div>
      <button onClick={deleteCarrito} className="button1  ">eliminar Carrito</button>
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
    </div>

  );
}




