import axiosInstance from "../../tools/AxiosInstance";

/**
 * @typedef {object} Cliente
 * @property {number} id_empresa
 * @property {number} id_cliente
 * @property {string} nombre_cliente
 * @property {string} celular
 */

/**
 * Crea un nuevo pedido en el servidor.
 * @param {Pedido} pedido - Objeto que representa el pedido a crear.
 * @returns {Promise<Object>} - Respuesta del servidor.
 * @throws {Error} - Si ocurre un error al crear el pedido.
 */
export async function getClientePorTelefonoOCelular(id_empresa, telefono) {
    const params = {
        id_empresa,
        telefono
    }

    try {
        // Enviar el pedido al servidor
        const response = await axiosInstance.get("/getClientePorTelefonoOCelular", {params});
        console.log("Cliente encontrado:", response.data.cliente[0]);
        return response.data.cliente[0]; // Devuelve la respuesta del servidor
    } catch (error) {
        console.error("Error al crear el pedido:", error);
        throw new Error("No se pudo crear el pedido. Inténtalo de nuevo.");
    }
}