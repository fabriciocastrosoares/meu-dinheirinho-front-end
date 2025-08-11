import axios from "axios";

function criarConfig(token){
    return {
        headers:{
            Authorization: `Bearer ${token}`
        }
    };
};

function carregarTrasacoes(token){
    const promise = axios.get(`${process.env.REACT_APP_API_URL}/operacoes`, criarConfig(token));
    return promise;
};

function adicionarTransacoes(token, body){
    const promise = axios.post(`${process.env.REACT_APP_API_URL}/operacoes`, body, criarConfig(token));
    return promise;
};

function apagarTransacoes(token, id){
    const promise = axios.delete(`${process.env.REACT_APP_API_URL}/operacoes/${id}`, criarConfig(token));
    return promise;
};

function editarTransacao(token, id, body){
    const promise = axios.put(`${process.env.REACT_APP_API_URL}/operacoes/${id}`, body, criarConfig(token));
    return promise;
};


const apiTransacoes = {carregarTrasacoes, adicionarTransacoes, apagarTransacoes, editarTransacao};
export default apiTransacoes;