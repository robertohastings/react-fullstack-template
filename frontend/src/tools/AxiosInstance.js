import axios from "axios";

const api_url = process.env.REACT_APP_API_URL

// Crea una instancia de Axios
const axiosInstance = axios.create({
    baseURL: api_url,
    headers: {
        "Content-Type": "application/json",
    },
})

// Variables para almacenar funciones externas
let getToken;
let appDispatch;
let navigate;

// Configura un interceptor para las solicitudes
axiosInstance.interceptors.request.use(
    (config) => {
        if (getToken) {
            const token = getToken(); // Obtén el token dinámicamente
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
        }
        return config;
    },
    (error) => {
        // Si hay un error, verifica si es un problema con el token
        // if (error.response && error.response.status === 401) {
        //     console.error("Token inválido o expirado. Redirigiendo al inicio de sesión...");
        //     // Aquí puedes redirigir al usuario al inicio de sesión o refrescar el token
        //     window.location.href = "/login"; // Redirige al inicio de sesión
        // }
        console.error("Token inválido o expirado. Redirigiendo al inicio de sesión...");
        return Promise.reject(error);
    }
);

// Configura un interceptor para las respuestas
axiosInstance.interceptors.response.use(
    (response) => {
        // Si la respuesta es exitosa, simplemente devuélvela
        return response;
    },
    (error) => {
        if (error.response) {
            if (error.response.status === 401) {
                console.error("Token inválido o expirado. Redirigiendo al inicio de sesión...");
                if (appDispatch) {
                    appDispatch({ type: "logout" }); // Limpia el estado global
                }
                if (navigate) {
                    navigate("/"); // Redirige al inicio de sesión
                }
            } else if (error.response.status === 403) {
                console.error("Acceso denegado: No tienes permisos para esta acción.");
                if (appDispatch) {
                    appDispatch({
                        type: "alertMessage",
                        value: "Acceso denegado: No tienes permisos para esta acción.",
                        typeAlert: "danger",
                    });
                }
            }
        } else {
            console.error("Error en la respuesta del servidor:", error);
        }
        return Promise.reject(error);
    }
);

// Función para registrar la función que obtiene el token
export const setTokenGetter = (getter) => {
    getToken = getter;
};

// Función para registrar appDispatch y navigate
export const configureAxiosInstance = (dispatch, navigation) => {
    appDispatch = dispatch;
    navigate = navigation;
};


export default axiosInstance