import React from "react";
import "../../../styles/easyrestaurant/home.css";

import { Featurettes } from "../../component/easyrestaurant/Featurettes";
import { FooterEasy } from "../../component/easyrestaurant/footer";
import { Marketing } from "../../component/easyrestaurant/marketing";
import { NavbarEasy } from "../../component/easyrestaurant/navbar";



export const HomeEasyRest = () => {
  return (
    <>
      <NavbarEasy />
      <CarouselHome />
      <Marketing />
      <Featurettes />
      <FooterEasy />
    </>
  );
};
