import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import MinhaCarteira from "../components/MinhaCarteiraLogo";
import apiAuth from "../services/apiAuth";
import { UserContext } from "../contexts/UserContext";
import { useContinuarLogado } from "../hooks/useContinuarLogado";

export default function Login() {
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const { setNome, setToken } = useContext(UserContext);
    const navigate = useNavigate();

    useContinuarLogado();

    function fazerLogin(event) {
        event.preventDefault();
        const body = { email, senha };

        apiAuth.login(body)
            .then(res => {
                setNome(res.data.usuario.nome);
                setToken(res.data.token);
                localStorage.setItem("token", res.data.token);
                localStorage.setItem("nome", res.data.usuario.nome);
                navigate("/boas-vindas");
            })
            .catch(err => {
                alert(err.response.data);
            })
    };

    return (
        <TelaLogin>

            <form onSubmit={fazerLogin}>
                <MinhaCarteira />
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
                <button type="submit">Entrar</button>
            </form>

            <Link to="/Cadastro">
                Primeira vez? Cadastre-se!
            </Link>
        </TelaLogin>
    );
}

const TelaLogin = styled.div`
    background-color: green;
    font-family: "Raleway", sans-serif;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;