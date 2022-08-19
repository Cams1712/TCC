import React from "react";
import "./css/Global.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Cadastrar from "./components/Cadastrar";
import Header from "./components/Header";
import Home from "./components/Home";
import Login from "./components/Login";

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="cadastrar" element={<Cadastrar />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
