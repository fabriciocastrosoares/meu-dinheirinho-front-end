import { IoExitOutline } from 'react-icons/io5';
import { AiOutlineMinusCircle, AiOutlinePlusCircle } from "react-icons/ai";
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../contexts/UserContext';
import apiTransacoes from '../services/apiTransacoes';
import apiAuth from '../services/apiAuth';

export default function BoasVindas() {
  const navigate = useNavigate();
  const [operacoes, setOperacoes] = useState([]);
  const { usuarioContexto, setUsuarioContexto } = useContext(UserContext);
  const [saldo, setSaldo] = useState(0);



  function sair() {

    apiAuth.logout(usuarioContexto.token)
      .then(() => {
        setUsuarioContexto(null);
        navigate("/");
      })
      .catch(err => {
        alert(err.response.data);
      })

  };

useEffect(() => {
  if (!usuarioContexto?.token) return;
  carregarTrasacoesLista();
}, [usuarioContexto?.token]);

  function carregarTrasacoesLista() {
    apiTransacoes.carregarTrasacoes(usuarioContexto.token)
      .then(res => {
        const apiTransacoes = res.data;
        setOperacoes(apiTransacoes);
      })
      .catch(err => {
        alert(err.response.data);
      })

  };

  useEffect(exibeSaldo, [operacoes]);

  function exibeSaldo() {
    let total = 0;
    operacoes.forEach((t) => {
      const valor = parseFloat(t.valor);
      if (t.tipo === "saida") {
        total -= valor;
      } else {
        total += valor;
      }
    })
    setSaldo(total)
  };

 if (!usuarioContexto || !usuarioContexto.token) return null;

  return (

    <TelaBoasVindas>
      <UsuarioTopo>
        <h1>Olá, {usuarioContexto.nome} </h1>
        <ExitIcon onClick={sair} />
      </UsuarioTopo>

      {operacoes.length !== 0 ? (
        <TelaTransacoes>
          <ListaTransacoes>
            {operacoes.map(t => (
              <RegistroTransacoes key={t._id}>
                <div>
                  <span>{t.data}</span>
                  <strong>{t.descricao}</strong>
                </div>
                <Value color={t.tipo === "entrada" ? "positivo" : "negativo"}>
                  {parseFloat(t.valor).toFixed(2).replace(".", ",")}
                </Value>
              </RegistroTransacoes>
            ))}
          </ListaTransacoes>

          <SaldoContainer>
            <strong>SALDO</strong>
            <Value color={saldo > 0 ? "positivo" : "negativo"}>
              {saldo.toFixed(2).replace(".", ",")}
            </Value>
          </SaldoContainer>
        </TelaTransacoes>
      ) : (
        <TransacoesContainerVazio>
          <p>Não há registros de entrada ou saída</p>
        </TransacoesContainerVazio>
      )}


      <AdicionarTransacoes>
        <Link to="/operacoes/entrada">
          <AiOutlinePlusCircle />
          <p>Nova <br /> entrada</p>
        </Link>
        <Link to="/operacoes/saida">
          <AiOutlineMinusCircle />
          <p>Nova <br /> saída</p>
        </Link>
      </AdicionarTransacoes>
    </TelaBoasVindas >

  );
};

const TelaBoasVindas = styled.div`
    background-color: green;
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100vh;

`;

const UsuarioTopo = styled.div`
    display: flex;
    width: 100vw;
    align-items: center;
    justify-content: center;
    justify-content: space-between;
   
    h1 {
        font-family: "Raleway", sans-serif;
        font-weight: 700;
        font-size: 26px;
        margin-top: 25px;
        margin-left: 24px;
        white-space: nowrap;
        height: 31px;

    }
`;

const ExitIcon = styled(IoExitOutline)`
  color: #ffffff;
  font-weight: 700;
  width: 23px;
  height: 24px;
  margin-right: 24px;
  margin-top: 25px;
  cursor: pointer; 
`;

const TelaTransacoes = styled.ul`
  font-family: "Raleway", sans-serif;
  font-weight: 400;
  background-color: white;
  width: calc(100vw - 48px);
  height: 446px;
  display: flex;
  flex-direction: column;
  border-radius: 5px ;
  margin-top: 22px;
    article {
      margin-right: 10px;
      margin-left: 10px;
      bottom: 5px;
      display: flex;
      align-items: center;
      justify-content: space-between;   
      strong {
        font-family: "Raleway", sans-serif;
        font-weight: 700;
        text-transform: uppercase;
      }
    }

`;

const AdicionarTransacoes = styled.section`
  margin-top: 15px;
  display: flex;
  gap: 15px;
  width: 100%;
  padding: 0 24px;
  box-sizing: border-box;

  a {
    text-decoration: none;
    width: 100%;
    height: 114px;
    background-color: #49bb07ff;
    border-radius: 5px;
    color: white;
    font-weight: bold;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-between;
    padding: 10px;

    svg {
      font-size: 24px;
    }

    p {
      font-size: 16px;
      line-height: 20px;
      text-align: left;
    }

    &:hover {
      opacity: 0.9;
      cursor: pointer;
    }
  }
`;

const Value = styled.div`
  font-size: 16px;
  text-align: right;
  color: ${(props) => (props.color === "positivo" ? "green" : "red")};
`;

const RegistroTransacoes = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
  color: #000000;
  margin-right: 10px;
  margin-left: 12px;
  margin-top: 23px;
 
  div span {
    color: #c6c6c6;
    margin-right: 10px;
  }
`;


const TransacoesContainerVazio = styled.article`
  width: calc(100vw - 48px);
  height: 446px;
  background-color: #fff;
  color: #000;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items:center;
  margin-top: 22px;
  p{
    width: 180px;
    height: 46px;
    font-weight: 400;
    font-size: 20px;
    line-height: 23px;
    text-align: center;
    color: #868686;

  }
`;


const ListaTransacoes = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 16px 10px 0 10px;
`;

const SaldoContainer = styled.article`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  font-weight: bold;
  text-transform: uppercase;
  background-color: white;
  border-radius: 0 0 5px 5px;
  position: sticky;
  bottom: 0;
  z-index: 1
`;


