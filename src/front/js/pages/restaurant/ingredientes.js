import React from "react";
import { NavbarAdmin } from "../../component/navbarAdmin";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";

export const Ingredientes = () => {
  return (
    <>
      <NavbarAdmin />

      <div className="container">
        <div className="col-12">
          <h2>Ingredientes</h2>

          <div className="row">
            <div className="col-4 text-start">
              <div className="form-check">
                <input type="checkbox" className="form-check-input" id="extra" />
                <label className="form-check-label" for="extra">
                  Es un Extra
                </label>
              </div>
            </div>
            <div className="col-3">
            <input
                  type="text"
                  className="form-control"
                  id="extra"
                  placeholder="Precio"
                  value=""
                  required
                />
            </div>
            <div className="form-check">
                <input type="checkbox" className="form-check-input" id="quitar" />
                <label className="form-check-label" for="quitar">
                  Se puede Quitar
                </label>
              </div>
          </div>
        </div>
      </div>
    </>
  );
};
