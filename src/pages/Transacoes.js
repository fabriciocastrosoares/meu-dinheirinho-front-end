import { useContext, useState } from "react";
import styled from "styled-components";
import apiTransacoes from "../services/apiTransacoes";
import { UserContext } from "../contexts/UserContext";
import { useNavigate, useParams } from "react-router-dom";

export default function Trasacoes() {
  const [valor, setValor] = useState("");
  const [descricao, setDescricao] = useState("");
  const { usuarioContexto } = useContext(UserContext);
  const {tipo} = useParams();
  const navigate = useNavigate();

  function salvarOperacao(event) {
    event.preventDefault();

    let novoValor = valor;
    if (valor.includes(",")) {
      novoValor = valor.replace(",", ".")
    };

    const body = { valor: novoValor, descricao, tipo };
   
    apiTransacoes.adicionarTransacoes(usuarioContexto.token, body)
      .then(res => {
        navigate("/boas-vindas");
      })
      .catch(err => {
          alert(err.response.data);
      })
  };

  return (
    <TelaNovaTransacao>
      <h1>Nova {tipo}</h1>

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
        <button type="submit">Salvar {tipo}</button>
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
