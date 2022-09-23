import React, { useEffect, useContext, useState } from "react";
import { Context } from "../store/appContext";
import { Link, useNavigate } from "react-router-dom";
import "../../styles/home.css";
import UserNavBar from "../component/usernavbar";
import Toast from "react-bootstrap/Toast";

export const Allergens = () => {
    const { store, actions } = useContext(Context);
    const [idAlergeno, setIdAlergeno] = useState("");
    let navigate = useNavigate();


    useEffect(() => {
        store.user_allergens
    }, []);

    function deleteAllergen(id) {
        console.log("id es handleClick");
        console.log(id);
        actions.deleteUserAllergens(id);
    };


    function AddAlergeno() {
        console.log("soy handleclick");
        console.log(idAlergeno)
        actions.addAllergenToUser(idAlergeno, store.user_data.id);
    };

    return (
        <>
            <UserNavBar />
            <div className="input-group">
                <div className="input-group">
                    {/* {store.alergenos.map((item, index) => {
                    return(
                    <div key={index} className="form-check">
                        <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                        <label className="form-check-label" for="flexCheckDefault">
                        {item.description}
                        </label>
                    </div>
                    )
                    })} */}
                    <form>
                        <select
                            className="form-select"
                            id="inputGroupSelect04"
                            aria-label="Example select with button addon"
                            onChange={(e) => { setIdAlergeno(e.target.value) }}>
                            <option>Choose...</option>
                            {store.alergenos.map((item) => {
                                return (
                                    <option value={item.id}>{item.description}</option>
                                );
                            })}
                        </select>
                    </form>
                    <button
                        className="btn btn-success"
                        type="button"
                        onClick={AddAlergeno(idAlergeno)}
                    >
                        Button
                    </button>
                </div>
            </div>



            {store.user_alergenos.map((alergia) => {
                return (
                    <>
                        <Toast
                            onClose={(e) => {
                                const allergenToDelete = alergia.id;
                                deleteAllergen(allergenToDelete);
                            }}
                        >
                            <Toast.Header>
                                <strong className="me-auto">Descripción</strong>
                            </Toast.Header>
                            <Toast.Body>{alergia.allergen}</Toast.Body>
                        </Toast>
                    </>
                );
            })}
        </>
    );
};