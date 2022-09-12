import React, { useEffect, useContext, useState } from "react";
import { Context } from "../store/appContext";
import { Link, useNavigate } from "react-router-dom";
import "../../styles/home.css";
import UserNavBar from "../component/usernavbar";


export const Allergens = () => {

    const { store, actions } = useContext(Context);
    const [alergeno, setAlergeno] = useState(store.user_allergens?.description);

        return (
        
        <>
            <UserNavBar />
            {store.user_allergens.map((alergenos) => (
                <div className="p-3 border-0">
                    <div className="d-grid gap-2">
          <label className="form-label">Nombre</label>
          <div className="d-grid gap-2">
            <input
              type="text"
              className="form-control"
              placeholder="Indique su nombre"
              value={alergenos.description}
              onChange={(e) => {
                setAlergeno(e.target.value);
              }}
            />
          </div>
        </div>
                </div>         ))}
    </> 
  );
};