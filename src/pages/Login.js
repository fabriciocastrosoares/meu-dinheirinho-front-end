import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import MinhaCarteira from "../components/MinhaCarteiraLogo";
import apiAuth from "../services/apiAuth";
import { UserContext } from "../contexts/UserContext";

export default function Login() {
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const { setUsuarioContexto } = useContext(UserContext);
    const navigate = useNavigate();
   
    function fazerLogin(event) {
        event.preventDefault();
        const body = { email, senha };

        apiAuth.login(body)
            .then(res => {
                const {usuario, token} = res.data;
                setUsuarioContexto({...usuario, token});
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
                    required
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                />
                <input
                    placeholder="Senha"
                    type="password"
                    required
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