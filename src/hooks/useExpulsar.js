import { useContext, useEffect } from "react";
import { UserContext } from "../contexts/UserContext";
import { useNavigate } from "react-router-dom";

export function useExpulsar(){
    const { nome, token } = useContext(UserContext);
    const navigate = useNavigate();

    useEffect(() => {
        if(!nome || !token) navigate("/");
    }, [navigate, nome, token]);
};