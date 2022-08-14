import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react";
import Context from "../Context/Context";
import userContext from "../Context/userContext";

import Header from "./shared/Header.js"

import TelaLogin from "./pages/TelaLogin.js"
import TelaCadastro from "./pages/TelaCadastro.js"
import TelaTimeline from "./pages/TelaTimeline.js"
import TelaHashtag from "./pages/TelaHashtag.js"
import TelaUsuario from "./pages/TelaUsuario.js"

export default function App() {
  const [updateUser, setUpdateUSer] = React.useState("");
  const [userName, setUserName] = React.useState("");
  
  
  return (
    <>
      <Context.Provider value={{ updateUser, setUpdateUSer }}>
        <userContext value={{ userName, setUserName }}>
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path="/" element={<TelaLogin />} />
            <Route path="/sign-up" element={<TelaCadastro />} />
            <Route path="/timeline" element={<TelaTimeline />} />
            <Route path="/hashtag/:hashtag" element={<TelaHashtag />} />
            <Route path="/user/:id" element={<TelaUsuario />} />
          </Routes>
        </BrowserRouter>
        </userContext>
      </Context.Provider>
    </>
  );
}
