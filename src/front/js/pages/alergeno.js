import React, { useEffect, useContext, useState } from "react";
import { Context } from "../store/appContext";
import { Link, useNavigate } from "react-router-dom";
import "../../styles/home.css";
import UserNavBar from "../component/usernavbar";

export const Allergens = () => {
  const { store, actions } = useContext(Context);
  const [alergeno, setAlergeno] = useState(store.user_allergens?.description);
  let navigate = useNavigate();

  useEffect(() => {
    actions.getTokenFromSession();
    actions.getAllAllergens();
  }, []);

  const handleClick = () => {
    actions.putuser(alergeno);
    navigate("/alergeno");
  };

  return (
    <>
      <UserNavBar />
      {store.alergenos.map((item, k) => {
        return (
          <div>
            <div key={k} class="form-check">
              <input
                class="form-check-input"
                type="checkbox"
                value=""
                id="flexCheckDefault"
              />
              <label class="form-check-label" for="flexCheckDefault">
                {item.description}
              </label>
            </div>
          </div>
        );
      })}
    </>
  );
};
