import axiosInstance from "../../tools/AxiosInstance";

export async function getUsuario(id_empresa, id_usuario) {

    const params = {
        id_empresa: Number(id_empresa),
        id_usuario
    }

    try {
        const response = await axiosInstance.get("/getUsuario", {params});
        return response.data; // Devuelve la respuesta del servidor
    } catch (error) {
        console.error("Error al obtener usuario", error);
        throw new Error(error.response?.data?.message || "No se pudo obtener combo.");
    }

}
export async function putUsuario(perfil) {

    const {id_empresa, id_usuario, nombre, apellidos, celular, fecha_nacimiento} = perfil

    const params = {
        id_empresa: Number(id_empresa),
        id_usuario,
        nombre,
        apellidos,
        celular,
        fecha_nacimiento
    }

    try {
        const response = await axiosInstance.put("/putUsuario", {params});
        return response.data; // Devuelve la respuesta del servidor
    } catch (error) {
        console.error("Error al obtener guardar usuario", error);
        throw new Error(error.response?.data?.message || "No se pudo guardar el usuario.");
    }
}
export async function getPedidoDetalle(id_empresa, id_usuario) {
    const params = {
        id_empresa: Number(id_empresa),
        id_usuario
    }
   // console.log('params:', params)

    try {
        const response = await axiosInstance.get("/getPedidoDetalle", {params});
        return response.data; // Devuelve la respuesta del servidor
    } catch (error) {
        console.error("Error al obtener pedidos del usuario", error);
        throw new Error(error.response?.data?.message || "No se pudo obtener pedidos del usuario.");
    }
}
// Direcciones
export async function getDirecciones(params) {
    try {
        const response = await axiosInstance.get("/getDirecciones", {params});
        return response.data; // Devuelve la respuesta del servidor
    } catch (error) {
        console.error("Error al obtener direcciones del usuario", error);
        throw new Error(error.response?.data?.message || "No se pudo obtener las direcciones del usuario.");
    }
}
export async function postDireccion(params) {
    try {
        const response = await axiosInstance.post("/postDireccion", params);
        return response.data; // Devuelve la respuesta del servidor
    } catch (error) {
        console.error("Error al guardar direcciones del usuario", error);
        throw new Error(error.response?.data?.message || "No se pudo guardar las direcciones del usuario.");
    }
}