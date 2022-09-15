import React, { useEffect, useContext, useState } from "react";
import { Context } from "../store/appContext";
import { Link, useNavigate } from "react-router-dom";
import "../../styles/home.css";
import UserNavBar from "../component/usernavbar";
import Form from "react-bootstrap/Form";
import Toast from "react-bootstrap/Toast";

export const Allergens = () => {
  const { store, actions } = useContext(Context);
  const [alergeno, setAlergeno] = useState(store.user_allergens?.description);
  const [allergenId, setAllergenId] = useState("");
  const [userId, setUserId] = useState("");
  let navigate = useNavigate();

  const handleClick = () => {
    actions.putuser(alergeno);
    navigate("/alergeno");
  };

  return (
    <>
      <UserNavBar />

      <Form.Select aria-label="Default select example">
        <option>Lista de alergenos contraindicados</option>
        {store.alergenos.map((item) => {
          return (
            <>
              <option value={item.id}>{item.description}</option>
            </>
          );
        })}
      </Form.Select>

      {store.user_alergenos.map((alergia) => {
        return (
          <>
            <Toast>
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
