import Login from "./pages/Login";
import Cadastro from "./pages/Cadastro";
import BoasVindas from "./pages/BoasVindas";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Trasacoes from "./pages/Transacoes";
import { useState } from "react";
import { UserContext } from "./contexts/UserContext";

export default function App() {
  const [usuarioContexto, setUsuarioContexto] = useState({});
  return (
    <div>
      <BrowserRouter>
        <UserContext.Provider value={{ usuarioContexto, setUsuarioContexto }}>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/cadastro" element={<Cadastro />} />
            <Route path="/boas-vindas" element={<BoasVindas />} />
            <Route path="/operacoes/:tipo" element={<Trasacoes />} />
          </Routes>
        </UserContext.Provider>
      </BrowserRouter>
    </div>
  );
};


