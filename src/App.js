import Login from "./pages/Login";
import Cadastro from "./pages/Cadastro";
import BoasVindas from "./pages/BoasVindas";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AdicionarTransacao from "./pages/AdicionarTransacao";
import { useState } from "react";
import { UserContext } from "./contexts/UserContext";
import EditarTransacao from "./pages/EditarTransacao";

export default function App() {
  const [nome, setNome] = useState(localStorage.getItem("nome"));
  const [token, setToken] = useState(localStorage.getItem("token"));
  return (
    <div>
      <UserContext.Provider value={{ nome, setNome, token, setToken }}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/cadastro" element={<Cadastro />} />
            <Route path="/boas-vindas" element={<BoasVindas />} />
            <Route path="/operacoes/:tipo" element={<AdicionarTransacao />} />
            <Route path="/editar-operacao/:tipo" element={<EditarTransacao />} />
          </Routes>
        </BrowserRouter>
      </UserContext.Provider>
    </div>
  );
};


