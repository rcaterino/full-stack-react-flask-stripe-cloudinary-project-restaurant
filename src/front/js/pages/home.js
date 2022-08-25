import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { Menú } from "../component/menú";
import { Navbar } from "../component/navbar";
export const Home = () => {
  const { store, actions } = useContext(Context);

  return (
    <div className="text-center">
      <Menú />
    </div>
  );
};
