import React from "react";
import { FooterEasy } from "../../component/easyrestaurant/footer";
import { NavbarAdmin } from "../../component/easyrestaurant/navbarAdmin";
import { SidebarAdmin } from "../../component/easyrestaurant/sidebar";

export const Categorias = () => {
  return (
    <>
      <div className="dashboard">
        <NavbarAdmin />
        <div className="flex">
          <SidebarAdmin />
          <div className="content">
            <h3>Categorías</h3>
          </div>
        </div>

        <FooterEasy />
      </div>
    </>
  );
};
