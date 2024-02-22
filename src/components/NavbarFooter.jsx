import React from "react";
import Navbars from "./Navbars";
import Footers from "./Footers";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";

const NavbarFooter = () => {
  return (
    <>
      <ToastContainer theme="colored" />
      <Navbars />
      <div className="min-h-screen w-full">
        <Outlet />
      </div>
      <Footers />
    </>
  );
};

export default NavbarFooter;
