import { useContext, useEffect } from "react";
import { UserContext } from "../contexts/UserContext";
import { useNavigate } from "react-router-dom";

export function useContinuarLogado(){
    const { nome, token } = useContext(UserContext);
    const navigate = useNavigate();

    useEffect(() => {
        if(nome && token) navigate("/boas-vindas");
    }, [navigate, nome, token]);
};