import React, { useEffect, useContext, useState } from "react";
import { Context } from "../store/appContext";


export const Menu = () => {
    const { store, actions } = useContext(Context);
    const [isCarrito, setIsCarrito] = useState(false);

    useEffect(() => {

        fetch('https://3001-rcaterino-easyrestauran-x2j88jm3ue6.ws-eu63.gitpod.io/api/product')
            .then(res => res.json()
            )
            .then(products => {
                setStore({ products: products })
            })
    }, []);


    const handlePress = (e) => {
        e.preventDefault();
        let Car = [...store.carrito]; //[...] -> hace una copia del array
        console.log(Car);
        setIsCarrito(!isCarrito); //conmutamos estado
        console.log(isCarrito);
        //Usamos la exclamación porque no da tiempo a que cambie el estado del componente,
        //por eso utilizamos el estado contrario en la condición del if
        if (!isCarrito) {
            Car.push({
                "name": product.name
            });
        } else {
            Car = Car.filter((item) => item.name !== product.name);
        }
        actions.setCarrito(Car);
    }


    useEffect(() => {
        for (let item of store.carrito) {
            console.log(item)
            if (item.name == product.name) setIsCarrito(true)
        }
    }, [setIsCarrito]);
    return (
        <>
            <h2>Carrito</h2>
            <div><ul>
                {store.carrito.map((item) => {
                    return (
                        <>
                            <li>{item.name}</li>

                        </>
                    )
                })}
            </ul></div>
            {store.categories.map((category) => (
                <div >
                    <button data-text="Awesome" class="button">
                        <span class="actual-text">{category.name}</span>
                        <span class="hover-text" aria-hidden="true">{category.name}</span>
                    </button>
                    <div className="text-center mt-5 d-flex overflow-scroll" style={{ overflow: 'auto', whiteSpace: 'nowrap' }}>
                        {category.product.map((producto) => (
                            <div className="card">
                                <div className="card-img"></div>
                                <div className="card-info">
                                    <p className="text-title">{producto.name}</p>
                                    <p class="text-body">Product description and details</p>
                                </div>
                                <div class="card-footer">
                                    <span className="text-title">${producto.price}</span>
                                    <div className="card-button">
                                        <a href='' onClick={
                                            (e) => {
                                                handlePress(e);
                                            }
                                        } className="btn btn-outline-danger" style={{ height: "50px", marginTop: "7px" }}>
                                            {
                                                (isCarrito) ? (<svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-heart-fill mt-1" viewBox="0 0 16 16">
                                                    <path fillRule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z" />
                                                </svg>) : (<svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-heart mt-1" viewBox="0 0 16 16">
                                                    <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z" />
                                                </svg>)
                                            }
                                        </a>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </>
    );
};
