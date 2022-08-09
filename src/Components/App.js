import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react";
import Context from "../Context/Context";

import Header from "./shared/Header.js"

import TelaLogin from "./pages/TelaLogin.js"
import TelaCadastro from "./pages/TelaCadastro.js"
import TelaTimeline from "./pages/TelaTimeline.js"
import TelaHashtag from "./pages/TelaHashtag.js"
import TelaUsuario from "./pages/TelaUsuario.js"

export default function App() {
  const [token, setToken] = React.useState("");
  const [name, setName] = React.useState("");

  return (
    <>
      <Context.Provider value={{ token, setToken, name, setName }}>
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
      </Context.Provider>
    </>
  );
}
