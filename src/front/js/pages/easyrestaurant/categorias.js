import React from "react";
import { FooterEasy } from "../../component/easyrestaurant/footer";
import { NavbarAdmin } from "../../component/easyrestaurant/navbarAdmin";
import { SidebarAdmin } from "../../component/easyrestaurant/sidebar";

export const Categorias = () => {
  return (
    <>
    <div className="dashboard">
        <NavbarAdmin />
          <SidebarAdmin />
        <div className="">
          <div className="content">
          <div className="">
        <div className="container align-items-center">
          <div>
            <div className=" text-center">
              <h2>Categorias</h2>
              <p className="lead">
                Agrega las categorias del menu
              </p>
            </div>

            <div className="">
              <div className="">
                <form className="needs-validation" novalidate>
                  <div className="">
                    <div className="">
                      <label for="nombre" className="form-label">
                        Nombre
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="nombre"
                        placeholder=""
                        required
                      />
                      <div className="invalid-feedback">
                        Por favor introducir un nombre para el producto.
                      </div>
                    </div>
                  </div>

                  <hr className="my-4" />

                  <button
                    className=" btn btn-primary btn-lg"
                    type="submit"
                  >
                    Guardar
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
     </div>
        </div>
        <FooterEasy />
      </div>
      
    </>
  );
};
