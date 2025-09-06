import React from "react";
import { Toaster } from "react-hot-toast";
import Navbar from "../components/Navbar/Navbar";
import Home from "./home/page";

const MainPage = () => {
  return (
    <div>
      {/* navbar */}
      <Navbar />

      {/* main home page */}
      <Home />
    </div>
  );
};

export default MainPage;
