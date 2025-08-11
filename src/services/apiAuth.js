import axios from "axios";

function criarConfig(token) {
    return {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };
};

function login(body) {
    const promise = axios.post(`${process.env.REACT_APP_API_URL}/login`, body);
    return promise;
}

function cadastro(body) {
    const promise = axios.post(`${process.env.REACT_APP_API_URL}/cadastro`, body);
    return promise;
}

function logout(token) {
    const promise = axios.post(`${process.env.REACT_APP_API_URL}/logout`, {}, criarConfig(token));
    return promise;
}

const apiAuth = { login, cadastro, logout };
export default apiAuth;