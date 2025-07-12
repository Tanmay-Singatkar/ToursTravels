import React from "react";
import { useLocation } from "react-router-dom";
import Header from "./../Header/Header";
import Routers from "../../router/Routers";
import Footer from "./../Footer/Footer";

const Layout = () => {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <>
      {!isAdminRoute && <Header />}
      <Routers />
      {!isAdminRoute && <Footer />}
    </>
  );
};

export default Layout;
