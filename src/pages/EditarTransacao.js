import { useContext, useState } from "react";
import styled from "styled-components";
import apiTransacoes from "../services/apiTransacoes";
import { UserContext } from "../contexts/UserContext";
import { useLocation, useNavigate, useParams } from "react-router-dom";

export default function EditarTransacao() {
  const { tipo } = useParams();
  const navigate = useNavigate();
  const tipoTexto = tipo === "entrada" ? "Entrada" : "Saída";
  const { state: { _id, descricao, valor } } = useLocation();
  const [stateValor, setStateValor] = useState(valor);
  const [stateDescricao, setStateDescricao] = useState(descricao);
  const { token } = useContext(UserContext);

  function salvarOperacao(event) {
    event.preventDefault();

    let novoValor = stateValor;
    if (stateValor.includes(",")) {
      novoValor = stateValor.replace(",", ".")
    };

    const body = { valor: novoValor, descricao: stateDescricao, tipo };

    apiTransacoes.editarTransacao(token, _id, body)
      .then(res => {
        navigate("/boas-vindas");
      })
      .catch(err => {
        alert(err.response.data);
      })
  };

  return (
    <TelaEditarTransacao>
      <h1>Editar {tipoTexto}</h1>

      <form onSubmit={salvarOperacao}>
        <input
          placeholder="Valor"
          type="text"
          required
          value={stateValor}
          onChange={e => setStateValor(e.target.value)}
        />
        <input
          placeholder="Descrição"
          type="text"
          required
          value={stateDescricao}
          onChange={e => setStateDescricao(e.target.value)}
        />
        <button type="submit">Atualizar {tipoTexto}</button>
      </form>
    </TelaEditarTransacao>
  );
};


const TelaEditarTransacao = styled.main`
  background-color: green;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;

  h1 {
    font-family: "Raleway", sans-serif;
    margin-top: 25px;
    margin-left: 24px;
    align-self: flex-start;
    margin-bottom: 40px;
  }
`;
