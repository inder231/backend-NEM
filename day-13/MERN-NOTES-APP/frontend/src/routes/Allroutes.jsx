import React from "react";
import { Route, Routes } from "react-router-dom";
import Notes from "../components/Notes";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Signup from "../pages/Signup";

const Allroutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/login" element={<Login/>} />
      <Route path="/signup" element={<Signup/>} />
      <Route path="/notes" element={<Notes/>} />
      <Route path="*" element={"404 Page not found !"} />
    </Routes>
  );
};

export default Allroutes;
