
import axios from "axios";

const api_url = process.env.REACT_APP_API_URL

// Crea una instancia de Axios
const axiosInstance = axios.create({
    baseURL: api_url,
})

// Variable para almacenar la función que obtiene el token
let getToken;

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
        return Promise.reject(error);
    }
);

// Función para registrar la función que obtiene el token
export const setTokenGetter = (getter) => {
    getToken = getter;
};

// Configura un interceptor para las respuestas
// axiosInstance.interceptors.response.use(
//     (response) => response,
//     (error) => {
//         if (axios.isCancel(error)) {
//             console.error("Solicitud cancelada:", error.message)
//         } else if (error.response && error.response.status === 401) {
//             // Si el servidor devuelve un 401, el token es inválido
//             console.error("Token inválido o expirado")
//         }
//         return Promise.reject(error)
//     }
// )

export default axiosInstance