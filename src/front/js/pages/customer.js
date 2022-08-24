import React, { useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import { NavbarCustomer } from "../component/navbarCustomer";

export const Customer = () => {
    const { store, actions } = useContext(Context);

    return (

        <div className="text-center">
            <NavbarCustomer />
            <h1>Carta del Dia</h1>



            <div className="card m-2" style={{ minWidth: '18rem', background: "rgb(256, 166, 0, 0)" }}>
                {/* <img src={image} className="card-img-top" alt="Fallo al recuperar imagen" /> */}
                <div className="card-body">
                    <h5 style={{ color: 'black' }} className="card-title">Aqui voy a ver el menu</h5>
                    {/*La interrogación antes del punto le indica al programa que si no tiene nada que cargar no lo ponga */}
                    <p style={{ color: 'black' }} className="card-text"><br></br>
                        <br></br></p>
                    {/*<Link to={} className="btn btn-warning link-dark">Detalles</Link>*/}
                </div>
            </div>

        </div>
    );
};