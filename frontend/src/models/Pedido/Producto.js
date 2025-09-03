import axiosInstance from "../../tools/AxiosInstance";

/**
 * @typedef {Object} Combo
 * @property {number} id_empresa
 * @property {number} id_producto
 * @property {number} id_producto_combo
 * @property {number} cantidad
 */
/**
 * @typedef {Object} Producto
 * @property {number} id_producto
 * @property {string} nombre
 * @property {number} costo
 * @property {string} image1
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
export async function getProductosByProveedor(id_empresa, id_proveedor) {

    const params = {
        id_empresa: Number(id_empresa),
        id_proveedor: Number(id_proveedor)
    }
    console.log("params getProductosByProveedor:", params)

    try {
        const response = await axiosInstance.get("/inventario/getProductosByProveedor", {params});
        return response.data; // Devuelve la respuesta del servidor
    } catch (error) {
        console.error("Error al obtener productos por proveedor", error);
        throw new Error(error.response?.data?.message || "No se pudo obtener productos.");
    }

}
export async function getKardex(id_empresa, sku, id_producto, fecha, tipoMovimiento, currentPage, rowsPerPage) {

    const params = {
        id_empresa: Number(id_empresa),
        sku,
        id_producto: Number(id_producto),
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
export async function getOrdenCompraEstatus(id_empresa) {
    
    const params = {
        id_empresa: Number(id_empresa)
    }

    try {
        const response = await axiosInstance.get("/getOrdenCompraEstatus", {params});
        return response.data; // Devuelve la respuesta del servidor
    } catch (error) {
        console.error("Error al obtener compbo", error);
        throw new Error(error.response?.data?.message || "No se pudo obtener data.");
    }

}
export async function getProveedoresFiltro(id_empresa) {    
    const params = {
        id_empresa: Number(id_empresa)
    }

    try {
        const response = await axiosInstance.get("/getProveedoresFiltro", {params});
        return response.data; // Devuelve la respuesta del servidor
    } catch (error) {
        console.error("Error al obtener compbo", error);
        throw new Error(error.response?.data?.message || "No se pudo obtener data.");
    }
}
export async function getOrdenDeCompra(params) {

    console.log("getOrdenDeCompra params:", params);

    try {
        const response = await axiosInstance.get("/getOrdenDeCompra", {params});
        console.log('getOrdenDeCompra data:', response.data)
        return response.data; // Devuelve la respuesta del servidor
    } catch (error) {
        console.error("Error al obtener compbo", error);
        throw new Error(error.response?.data?.message || "No se pudo obtener data.");
    }

}
export async function postOrdenDeCompra(id_empresa, fecha, id_proveedor, total_orden, id_usuario, ordencompra_detalle ) {

    const params = {
        id_empresa: Number(id_empresa),
        fecha,
        id_proveedor: Number(id_proveedor),
        total_orden,
        id_usuario,
        ordencompra_detalle
    }
    console.log("postOrdenDeCompra params:", params);

    try {
        const response = await axiosInstance.post("/postOrdenDeCompra", params);
        return response.data; // Devuelve la respuesta del servidor
    } catch (error) {
        console.error("Error al obtener compbo", error);
        throw new Error(error.response?.data?.message || "No se pudo obtener data.");
    }

}
export async function putOrdenDeCompra(id_empresa, id_ordencompra, fecha, id_proveedor, total_orden, id_estado_ordencompra, id_usuario, ordencompra_detalle ) {

    const params = {
        id_empresa: Number(id_empresa),
        id_ordencompra,
        fecha,
        id_proveedor: Number(id_proveedor),
        total_orden,
        id_estado_ordencompra,
        id_usuario,
        ordencompra_detalle
    }
    console.log("putOrdenDeCompra params:", params);

    try {
        const response = await axiosInstance.put("/putOrdenDeCompra", params);
        return response.data; // Devuelve la respuesta del servidor
    } catch (error) {
        console.error("Error al obtener compbo", error);
        throw new Error(error.response?.data?.message || "No se pudo obtener data.");
    }

}
export async function putOrdenDeCompraRecibo(id_empresa, id_ordencompra, id_usuario) {

    const params = {
        id_empresa: Number(id_empresa),
        id_ordencompra,
        id_usuario
    }
    console.log("putOrdenDeCompraRecibo params:", params);

    try {
        const response = await axiosInstance.put("/putOrdenDeCompraRecibo", params);
        return response.data; // Devuelve la respuesta del servidor
    } catch (error) {
        console.error("Error en putOrdenDeCompraRecibo", error);
        throw new Error(error.response?.data?.message || "No se pudo obtener data.");
    }

}
export async function deleteOrdenDeCompra(id_empresa, id_ordencompra, id_usuario) {

    const params = {
        id_empresa: Number(id_empresa),
        id_ordencompra,
        id_usuario
    }
    console.log("deleteOrdenDeCompra params:", params);

    try {
        const response = await axiosInstance.put("/deleteOrdenDeCompra", params);
        return response.data; // Devuelve la respuesta del servidor
    } catch (error) {
        console.error("Error en deleteOrdenDeCompra", error);
        throw new Error(error.response?.data?.message || "No se pudo obtener data.");
    }

}
