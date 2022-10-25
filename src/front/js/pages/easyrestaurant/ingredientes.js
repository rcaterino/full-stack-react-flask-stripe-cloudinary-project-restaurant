import React from "react";
import { FooterEasy } from "../../component/easyrestaurant/footer";
import { NavbarAdmin } from "../../component/easyrestaurant/navbarAdmin";
import { SidebarAdmin } from "../../component/easyrestaurant/sidebar";


export const Ingredientes = () => {
  return (
    <>
    <div className="dashboard">
        <NavbarAdmin />
        <div className="flex">
          <SidebarAdmin />
          <div className="content">
          <div class="col-10">
        <div class="container align-items-center">
          <div>
            <div class=" text-center">
              <h2>Ingredientes</h2>
              <p class="lead">
                Agrega los ingredientes de tus productos
              </p>
            </div>

            <div class="row g-5">
              <div class="col-12">
                <form class="needs-validation" novalidate>
                  <div class="row g-3">
                    <div class="col-12">
                      <label for="nombre" class="form-label">
                        Nombre
                      </label>
                      <input
                        type="text"
                        class="form-control"
                        id="nombre"
                        placeholder=""
                        required
                     
                      />
                      <div class="invalid-feedback">
                        Por favor introducir un nombre para el producto.
                      </div>
                    </div>

                    <div class="col-12">
                      <label for="description" class="form-label">
                        Descripción
                      </label>
                      <input
                        type="text"
                        class="form-control"
                        id="description"
                        placeholder=""
                        required
                   
                      />
                      <div class="invalid-feedback">
                        Por favor introducir una descripción del producto.
                      </div>
                    </div>

                    <div class="col-12 p-1">
                      <label for="category" class="form-label">
                        Extra
                      </label>
                      <select
                        class="form-select"
     
                        required
                      >
                        <option></option>
                      
                      </select>
                      <div class="invalid-feedback">
                      </div>
                    </div>
                    <div class="col-12 p-1">
                      <label for="category" class="form-label">
                        removible 
                      </label>
                      <select
                        class="form-select"
     
                        required
                      >
                        <option></option>
                      
                      </select>
                      <div class="invalid-feedback">
                      </div>
                    </div>

                    <div class="row mt-4 justify-content-end">
                      <div className="col-4">
                        <label for="price" class="form-label">
                          Precio:
                        </label>
                      </div>
                      <div className="col-4 ">
                        <input
                          type="text"
                          class="form-control"
                          id="price"
                          placeholder=""
                          required
            
                        />
                        <div class="invalid-feedback">
                          Por favor indica un pracio para el ingrediente.
                        </div>
                      </div>
                    </div>

                  </div>

                  <hr class="my-4" />

                  <button
                    class=" btn btn-primary btn-lg"
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
