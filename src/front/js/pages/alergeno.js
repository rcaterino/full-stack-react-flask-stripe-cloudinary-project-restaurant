import React, { useEffect, useContext, useState } from "react";
import { Context } from "../store/appContext";
import { Link, useNavigate } from "react-router-dom";
import "../../styles/home.css";
import UserNavBar from "../component/usernavbar";
import Form from "react-bootstrap/Form";
import Toast from "react-bootstrap/Toast";

export const Allergens = () => {
  const { store, actions } = useContext(Context);
  let navigate = useNavigate();

  console.log(store.user_alergenos);
  useEffect(() => {
    store.user_alergenos;
  }, []);

  function deleteAllergen(id) {
    console.log("id es handleClick");
    console.log(id);
    actions.deleteUserAllergens(id);
  }

  function addAllergen(allergen_id, user_id) {
    console.log("id del alergeno para agregar");
    console.log(allergen_id);
    console.log("id del usuario");
    console.log(user_id);
    actions.addAllergenToUser(allergen_id, user_id);
  }

  return (
    <>
      <UserNavBar />
      <div class="input-group">
  <div class="input-group">
    <select
      class="form-select"
      id="inputGroupSelect04"
      aria-label="Example select with button addon"
    >
      <option selected>Choose...</option>
      {store.alergenos.map((item) => {
        return (
          <>
            <option value={item.id}>{item.description}</option>
            <button
              class="btn btn-outline-secondary"
              type="button"
              onClick={(e) => {
                const allergenToAdd = item.id;
                const userId = item.user_id;
                addAllergen(allergenToAdd, userId);
              }}
            >
              Button
            </button>
          </>
        );
      })}
    </select>
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
