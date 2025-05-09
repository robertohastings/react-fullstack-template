import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { configureAxiosInstance } from "./AxiosInstance";
import { useContext } from "react";
import DispatchContext from "../DispatchContext";

function AxiosConfig() {
    const navigate = useNavigate();
    const appDispatch = useContext(DispatchContext);

    useEffect(() => {
        // Configura axiosInstance con appDispatch y navigate
        configureAxiosInstance(appDispatch, navigate);
    }, [appDispatch, navigate]);

    return null; // Este componente no renderiza nada
}

export default AxiosConfig;
