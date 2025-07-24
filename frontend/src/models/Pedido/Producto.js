import axiosInstance from "../../tools/AxiosInstance";

/**
 * @typedef {Object} Combo
 * @property {number} id_empresa
 * @property {number} id_producto
 * @property {number} id_producto_combo
 * @property {number} cantidad
 */

export async function getProductosCombo(id_empresa, id_producto) {

    const params = {
        id_empresa: Number(id_empresa),
        id_producto
    }

    try {
        const response = await axiosInstance.get("/getProductosCombo", {params});
        return response.data; // Devuelve la respuesta del servidor
    } catch (error) {
        console.error("Error al obtener compbo", error);
        throw new Error(error.response?.data?.message || "No se pudo obtener combo.");
    }

}
export async function getKardex(id_empresa, sku, fecha, tipoMovimiento, currentPage, rowsPerPage) {

    const params = {
        id_empresa: Number(id_empresa),
        sku,
        fecha,
        tipoMovimiento, 
        currentPage, 
        rowsPerPage        
    }
    console.log("getKardex params:", params);

    try {
        const response = await axiosInstance.get("/getKardex", {params});
        return response.data; // Devuelve la respuesta del servidor
    } catch (error) {
        console.error("Error al obtener compbo", error);
        throw new Error(error.response?.data?.message || "No se pudo obtener data.");
    }

}