import axios from "axios";
import { isTokenValid } from "./Utils";
import { useNavigate } from "react-router-dom";

const api_url = process.env.REACT_APP_API_URL

// Crea una instancia de Axios
const axiosInstance = axios.create({
    baseURL: api_url,
})

// Configura un interceptor para las solicitudes
axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("complexappToken")

        // Verifica si el token es válido
        if (token && !isTokenValid(token)) {
            // Si el token no es válido, lanza un error
            throw new axios.Cancel("Token inválido o expirado")
        }

        // Agrega el token al encabezado de autorización
        if (token) {
            config.headers.Authorization = `Bearer ${token}`
        }

        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)

// Configura un interceptor para las respuestas
axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        if (axios.isCancel(error)) {
            console.error("Solicitud cancelada:", error.message)
        } else if (error.response && error.response.status === 401) {
            // Si el servidor devuelve un 401, el token es inválido
            console.error("Token inválido o expirado")
        }
        return Promise.reject(error)
    }
)

export default axiosInstance