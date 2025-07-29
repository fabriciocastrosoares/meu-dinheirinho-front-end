import axios from "axios";

const BASE_URL = "http://localhost:5000/operacoes";

function criarConfig(token){
    return {
        headers:{
            Authorization: `Bearer ${token}`
        }
    };
};

function carregarTrasacoes(token){
    const promise = axios.get(BASE_URL, criarConfig(token));
    return promise;
};

function adicionarTransacoes(token, body){
    const promise = axios.post(BASE_URL, body, criarConfig(token));
    return promise;
};

function apagarTransacoes(token){

};

const apiTransacoes = {carregarTrasacoes, adicionarTransacoes, apagarTransacoes};
export default apiTransacoes;