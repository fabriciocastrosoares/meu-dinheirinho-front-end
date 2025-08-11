import { useContext, useState } from "react";
import styled from "styled-components";
import apiTransacoes from "../services/apiTransacoes";
import { UserContext } from "../contexts/UserContext";
import { useNavigate, useParams } from "react-router-dom";
import { useExpulsar } from "../hooks/useExpulsar";

export default function Transacoes() {
  const [valor, setValor] = useState("");
  const [descricao, setDescricao] = useState("");
  const { token } = useContext(UserContext);
  const { tipo } = useParams();
  const navigate = useNavigate();
  const tipoTexto = tipo === "entrada" ? "Entrada" : "Saída";

  useExpulsar();

  function salvarOperacao(event) {
    event.preventDefault();

    let novoValor = valor;
    if (valor.includes(",")) {
      novoValor = valor.replace(",", ".")
    };

    const body = { valor: novoValor, descricao, tipo };

    apiTransacoes.adicionarTransacoes(token, body)
      .then(res => {
        navigate("/boas-vindas");
      })
      .catch(err => {
        alert(err.response.data);
      })
  };

  return (
    <TelaNovaTransacao>
      <h1>Nova {tipoTexto}</h1>

      <form onSubmit={salvarOperacao}>
        <input
          placeholder="Valor"
          type="text"
          required
          value={valor}
          onChange={e => setValor(e.target.value)}
        />
        <input
          placeholder="Descrição"
          type="text"
          required
          value={descricao}
          onChange={e => setDescricao(e.target.value)}
        />
        <button type="submit">Salvar {tipoTexto}</button>
      </form>
    </TelaNovaTransacao>
  );
};


const TelaNovaTransacao = styled.main`
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
