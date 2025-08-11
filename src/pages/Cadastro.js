import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import MinhaCarteira from "../components/MinhaCarteiraLogo";
import { useState } from "react";
import apiAuth from "../services/apiAuth";
import { useContinuarLogado } from "../hooks/useContinuarLogado";

export default function Cadastro() {
    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [confirmarSenha, setConfirmarSenha] = useState("");
    const navigate = useNavigate();

    useContinuarLogado();

    function fazerCadastro(event) {
        event.preventDefault();

        if (senha !== confirmarSenha) return alert("As senhas devem ser iguais!");

        const body = { nome, email, senha };

        apiAuth.cadastro(body)
            .then(res => {
                alert("cadastro realizado com suscesso")
                navigate("/");
            })
            .catch(err => {
                alert(err.response.data);
            })
    };

    return (
        <TelaCadastro>
            <form onSubmit={fazerCadastro}>
                <MinhaCarteira />
                <input
                    placeholder="Nome"
                    type="text"
                    required
                    value={nome}
                    onChange={e => setNome(e.target.value)}
                />
                <input
                    placeholder="E-mail"
                    type="email"
                    autoComplete="username"
                    required
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                />
                <input
                    placeholder="Senha"
                    type="password"
                    autoComplete="new-password"
                    required
                    minLength={3}
                    value={senha}
                    onChange={e => setSenha(e.target.value)}
                />
                <input
                    placeholder="Confirme a senha"
                    type="password"
                    autoComplete="new-password"
                    required
                    minLength={3}
                    value={confirmarSenha}
                    onChange={e => setConfirmarSenha(e.target.value)}
                />
                <button type="submit">Cadastrar</button>
            </form>

            <Link to="/">
                Já tem uma conta? Entre agora!
            </Link>
        </TelaCadastro>

    );
};

const TelaCadastro = styled.div`
    background-color: green;
    font-family: "Raleway", sans-serif;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;