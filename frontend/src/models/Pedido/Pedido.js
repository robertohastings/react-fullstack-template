import axiosInstance from "../../tools/AxiosInstance";

/**
 * @typedef {Object} Pedido
 * @property {number} id_empresa - ID de la empresa
 * @property {number} [id_pedido] - ID del pedido
 * @property {number} [id_usuario] - ID del usuario   
 * @property {number} [id_cliente] - ID del cliente
 * @property {number} [id_direccion] - ID de la dirección
 * @property {number} [id_pedido_estatus] - ID del estatus del pedido
 * @property {number} [id_tipo_pedido] - ID del tipo de pedido
 * @property {number} [id_forma_de_pago] - ID de la forma de pago
 * @property {number} [id_tipo_cliente]
 * @property {number} total - Total del pedido
 * @property {number} importe_pagado - Total pagado
 * @property {number} saldo - Deuda pendiente
 * @property {Date} fecha_creacion - Fecha del pedido
 * @property {Date} fecha_actualizacion - Fecha de modificación del pedido
 * @property {string} motivo_cancelacion
 * @property {PedidoDetalle[]} [pedido_detalle] - Detalle del pedido
 * @property {PedidoFormasDePago[]} [pedido_formas_de_pago] - Detalle de las formas de pago
 * @property {PedidoDomicilio} [pedido_domicilio] - Detalle de la dirección
 * @property {number} id_cajero - Número de cajero
 */

/**
 * @typedef {Object} PedidoDetalle
 * @property {number} [id_pedido_detalle] - ID del detalle del pedido
 * @property {number} id_producto - ID del producto
 * @property {number} cantidad - Cantidad del producto
 * @property {number} precio - Precio del producto
 * @property {number} [subtotal] - Subtotal del producto (cantidad * precio)
 * @property {Date} [fecha_creacion] - Fecha de creación del detalle
 * @property {Date} [fecha_actualizacion] - Fecha de modificación del detalle
 */

/**
 * @typedef {object} PedidoFormasDePago
 * @property {number} [id_forma_de_pago] - consecutivo
 * @property {boolean} es_pago_total - 1 = pago total, 0 = pago parcial
 * @property {number} monto_pagado - monto del pago
 * @property {number} saldo - saldo pendiente por pagar
 */
/**
 * @typedef {Object} PedidoDomicilio
 * @property {number} id_direccion - ID de la dirección
 * @property {number} id_colonia - ID de la dirección
 * @property {string} colonia - Colonia de la dirección
 * @property {string} calle - Calle de la dirección
 * @property {string} numero_exterior - Número exterior de la dirección 
 * @property {string} entre_calles - entre calles de la dirección
 * @property {string} referencia - Referencia de la dirección
 * @property {number} cargo_nueva_colonia - Referencia de la dirección
 */

/**
 * Crea un nuevo pedido en el servidor.
 * @param {Pedido} pedido - Objeto que representa el pedido a crear.
 * @returns {Promise<Object>} - Respuesta del servidor.
 * @throws {Error} - Si ocurre un error al crear el pedido.
 */

/**
 * @typedef {Object} Cajero 
 * @param {number} id_empresa
 * @param {number} id_cajero
 * @param {string} nombre
 * @param {string} password  
 */

export async function crearPedido(pedido) {
    // Validaciones básicas
    // if (!pedido.id_empresa) {
    //     throw new Error("El campo 'id_empresa' es obligatorio.");
    // }
    // if (!pedido.id_cliente) {
    //     throw new Error("El campo 'id_cliente' es obligatorio.");
    // }
    // if (!pedido.total || pedido.total <= 0) {
    //     throw new Error("El campo 'total' debe ser mayor a 0.");
    // }
    // if (!pedido.pedido_detalle || pedido.pedido_detalle.length === 0) {
    //     throw new Error("El pedido debe contener al menos un detalle.");
    // }

    try {
        // Enviar el pedido al servidor
        const response = await axiosInstance.post("/postPedido", pedido);
        console.log("Pedido creado exitosamente:", response.data);
        return response.data; // Devuelve la respuesta del servidor
    } catch (error) {
        console.error("Error al crear el pedido:", error);
        throw new Error("No se pudo crear el pedido. Inténtalo de nuevo.");
    }
}
export async function getTipoPedido(id_empresa) {
    console.log("getTipoPedido -> id_empresa", id_empresa)
    const params = {
        id_empresa
    }

    try {
        // Enviar el pedido al servidor
        const response = await axiosInstance.get("/getTipoPedido", {params});
        console.log("TipoPedido encontrado:", response.data.tipoPedido);
        return response.data.tipoPedido; // Devuelve la respuesta del servidor
    } catch (error) {
        console.error("Error al cargar tipo de pedido:", error);
        throw new Error("Error al cargar tipo de pedido:");
    }
}
export async function getColoniasDelivery(id_empresa) {
    console.log("getColoniasDelivery -> id_empresa", id_empresa)
    const params = {
        id_empresa
    }

    try {
        // Enviar el pedido al servidor
        const response = await axiosInstance.get("/getColoniasDelivery", {params});
        console.log("ColoniasDelivery encontrado:", response.data.colonias);
        return response.data.colonias; // Devuelve la respuesta del servidor
    } catch (error) {
        console.error("Error al cargar colonias:", error);
        throw new Error("Error al cargar colonias:");
    }
}
export function getTipoCliente() {
    const tipoCliente = [
        {
            idTipoCliente: 0,
            tipoCliente: 'Cliente Mostrador'
        },
        {
            idTipoCliente: 1,
            tipoCliente: 'Registrar Cliente'
        }
    ]
    return tipoCliente
    
}
export async function getCajeros(id_empresa) {
    console.log("getCajeros -> id_empresa", id_empresa)
    const params = {
        id_empresa
    }

    try {
        // Enviar el pedido al servidor
        const response = await axiosInstance.get("/getCajeros", {params});
        console.log("getCajeros encontrados:", response.data.cajeros);
        return response.data.cajeros; // Devuelve la respuesta del servidor
    } catch (error) {
        console.error("Error al cargar cajeros:", error);
        throw new Error("Error al cargar cajeros:");
    }
}
export async function getCaja(id_empresa, ip) {
    //console.log("getCaja -> id_empresa", id_empresa)


    try {
        // Enviar el pedido al servidor

        const ipResponse = await axiosInstance.get("/getIP");
        const ipAddress = ipResponse.data.ip;

        const params = {
            id_empresa,
            ip: ipAddress
        }

        const response = await axiosInstance.get("/getCaja", {params});
        console.log("getCaja encontrados:", response.data.caja);
        return response.data.caja; // Devuelve la respuesta del servidor
    } catch (error) {
        console.error("Error al cargar caja:", error);
        throw new Error("Error al cargar caja:");
    }
}