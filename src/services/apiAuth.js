import axios from "axios";

const BASE_URL = "http://localhost:5000";


function criarConfig(token){
    return {
        headers:{
            Authorization: `Bearer ${token}`
        }
    };
};

function login(body) {
    const promise = axios.post(`${BASE_URL}/login`, body);
    return promise;
}

function cadastro(body) {
    const promise = axios.post(`${BASE_URL}/cadastro`, body);
    return promise;
}

function logout(token){
    const promise = axios.post(`${BASE_URL}/logout`, null, criarConfig(token));
    return promise;
}

const apiAuth = { login, cadastro, logout };
export default apiAuth;