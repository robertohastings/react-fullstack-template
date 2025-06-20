import { pool } from "../db.js"
import axios from "axios"
import requestIp from 'request-ip'


export const putLandingPage = async (req, res) => {
    const { id_empresa, id_landingPage } = req.params
    const { quienes_somos, servicios, productos, mostrar_quienes_somos, mostrar_productos, mostrar_servicios, mostrar_contactanos, mostrar_productos_verMas } = req.body

    try {
        const [result] = await pool.query("CALL putLandingPage(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", [id_empresa, id_landingPage, quienes_somos, servicios, productos, mostrar_quienes_somos, mostrar_productos, mostrar_servicios, mostrar_contactanos, mostrar_productos_verMas])

        if (result.affectedRows == 0) {
            res.status(404).json({
                message: "No se realizó actualización"
            })
        } else {
            return res.status(200).json({
                message: "Landing paga actualizada"
            })
        }
    } catch (error) {
        console.log("Ocurrió un error")
        res.status(500).json({
            message: `Error: ${error}`
        })
    }
}

export const putLandingPage_QuienesSomos = async (req, res) => {
    const { id_empresa, id_landingPage, quienes_somos } = req.body

    try {
        const [result] = await pool.query("CALL putLandingPage_QuienesSomos(?, ?, ?)", [id_empresa, id_landingPage, quienes_somos])

        if (result.affectedRows == 0) {
            res.status(404).json({
                message: "No se realizó actualización"
            })
        } else {
            return res.status(200).json({
                message: "Landing paga actualizada"
            })
        }
    } catch (error) {
        console.log("Ocurrió un error")
        res.status(500).json({
            message: `Error: ${error}`
        })
    }
}

export const putLandingPage_Productos = async (req, res) => {
    const { id_empresa, id_landingPage, productos } = req.body

    try {
        const [result] = await pool.query("CALL putLandingPage_Productos(?, ?, ?)", [id_empresa, id_landingPage, productos])

        if (result.affectedRows == 0) {
            res.status(404).json({
                message: "Landing Productos No se actualizó"
            })
        } else {
            return res.status(200).json({
                message: "Landing Productos actualizada"
            })
        }
    } catch (error) {
        console.log("Ocurrió un error")
        res.status(500).json({
            message: `Error: ${error}`
        })
    }
}

export const putLandingPage_Servicios = async (req, res) => {
    const { id_empresa, id_landingPage, servicios } = req.body

    try {
        const [result] = await pool.query("CALL putLandingPage_Servicios(?, ?, ?)", [id_empresa, id_landingPage, servicios])

        if (result.affectedRows == 0) {
            res.status(404).json({
                message: "Landing Servicios No se actualizó"
            })
        } else {
            return res.status(200).json({
                message: "Landing Servicios actualizada"
            })
        }
    } catch (error) {
        console.log("Ocurrió un error")
        res.status(500).json({
            message: `Error: ${error}`
        })
    }
}

export const putLandingPage_Settings = async (req, res) => {
    const { id_empresa, id_landingPage, mostrar_quienes_somos, mostrar_productos, mostrar_servicios, mostrar_contactanos, mostrar_sitioEnMantenimiento } = req.body

    try {
        const [result] = await pool.query("CALL putLandingPage_Settings(?, ?, ?, ?, ?, ?, ?)", [id_empresa, id_landingPage, mostrar_quienes_somos, mostrar_productos, mostrar_servicios, mostrar_contactanos, mostrar_sitioEnMantenimiento])

        if (result.affectedRows == 0) {
            res.status(404).json({
                message: "Landing Settings No se actualizó"
            })
        } else {
            return res.status(200).json({
                message: "Landing Settings actualizada"
            })
        }
    } catch (error) {
        console.log("Ocurrió un error")
        res.status(500).json({
            message: `Error: ${error}`
        })
    }
}

export const postPuntosDeEntrega = async (req, res) => {
    //console.log("postPuntosDeEntrega")
    //console.log("body:", req.body)
    const { id_empresa, id_puntoDeEntrega, nombre, horario, activo } = req.body

    try {
        const [result] = await pool.query("CALL postPuntoDeEntrega(?, ?, ?, ?, ?)", [id_empresa, id_puntoDeEntrega, nombre, horario, activo])
        if (result.affectedRows == 0) {
            res.status(404).json({
                message: `Puntos de acceso No se actualizó`
            })
        } else {
            return res.status(200).json({
                message: "Puntos de accesos actualizados"
            })
        }
    } catch (error) {
        //console.log("Ocurrió un error")
        res.status(500).json({
            message: `Error: ${error.message}`
        })
    }
}

export const putUsuario = async (req, res) => {
    //console.log("postPuntosDeEntrega")
    console.log("body:", req.body)
    const { id_empresa, id_usuario, nombre, apellidos, celular, fecha_nacimiento } = req.body

    try {
        const [result] = await pool.query("CALL putUsuario(?, ?, ?, ?, ?, ?)", [id_empresa, id_usuario, nombre, apellidos, celular, fecha_nacimiento])
        if (result.affectedRows == 0) {
            res.status(404).json({
                message: `Usuario No se actualizó`
            })
        } else {
            return res.status(200).json({
                message: "Usuario actualizado"
            })
        }
    } catch (error) {
        res.status(500).json({
            message: `Error: ${error.message}`
        })
    }
}

export const getUsuario = async (req, res) => {
    try {
        const { id_empresa, id_usuario } = req.query

        const rows = await pool.query(`CALL getUsuario(?, ?);`, [id_empresa, id_usuario])

        res.json({
            success: true,
            usuario: rows[0][0][0]
        })
    } catch (error) {
        res.status(500).json({
            error: `An error ocurred: ${error.message}`
        })
    }
}

export const postDireccion = async (req, res) => {
    console.log("postPuntosDeEntrega")
    console.log("body:", req.body)
    const { id_empresa, id_direccion, identidad, id_direccion_tipo_identidad, direccion_por_defecto, calle, numero, colonia, ciudad, estado, pais, codigo_postal } = req.body

    try {
        const [result] = await pool.query("CALL postDireccion(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", [id_empresa, id_direccion, identidad, id_direccion_tipo_identidad, direccion_por_defecto, calle, numero, colonia, ciudad, estado, pais, codigo_postal])
        if (result.affectedRows == 0) {
            res.status(404).json({
                message: `Dirección No se actualizó`
            })
        } else {
            return res.status(200).json({
                message: "Dirección actualizada"
            })
        }
    } catch (error) {
        res.status(500).json({
            message: `Error: ${error.message}`
        })
    }
}
export const getDirecciones = async (req, res) => {
    //console.log("here")
    try {
        const { limite, pagina, id_empresa, tipo_identidad, identidad } = req.query
        //console.log(limite, pagina)

        const rows = await pool.query(`CALL getDirecciones(?, ?, ?, ?, ?);`, [limite, pagina, id_empresa, tipo_identidad, identidad])

        res.status(200).json({
            success: true,
            direcciones: rows[0][1],
            totalRegistros: rows[0][0][0].totalRegistros
        })
    } catch (error) {
        res.status(500).json({
            error: "An error ocurred"
        })
    }
}
export const getPuntosDeEntregaCarrito = async (req, res) => {
    console.log("getPuntosDeEntregaCarrito:", req.query)
    try {
        const { id_empresa, id_direccion_tipo_identidad, identidad } = req.query
        //console.log(limite, pagina)

        const rows = await pool.query(`CALL getPuntosDeEntregaCarrito(?, ?, ?);`, [id_empresa, id_direccion_tipo_identidad, identidad])

        res.status(200).json({
            success: true,
            puntosDeEntrega: rows[0][0]
        })
    } catch (error) {
        res.status(500).json({
            error: "An error ocurred"
        })
    }
}
export const getFormasDePago = async (req, res) => {
    console.log("getFormasDePago:", req.query)
    try {
        const { id_empresa } = req.query
        //console.log(limite, pagina)

        const rows = await pool.query(`CALL getFormasDePago(?);`, [id_empresa])

        res.status(200).json({
            success: true,
            formasDePago: rows[0][0]
        })
    } catch (error) {
        res.status(500).json({
            error: "An error ocurred"
        })
    }
}
export const putFormasDePago = async (req, res) => {
    //console.log("body putFormasDePago:", req.body)
    const { id_empresa, formasDePago } = req.body
    //console.log("id_empresa", id_empresa)
    //console.log("formasDePago", formasDePago)

    try {
        const [result] = await pool.query("CALL putFormasDePago(?, ?)", [id_empresa, JSON.stringify(formasDePago)])

        if (result.affectedRows == 0) {
            res.status(404).json({
                message: "No se realizó actualización"
            })
        } else {
            return res.status(200).json({
                message: "Formas de pago actualizadas exitosamente"
            })
        }
    } catch (error) {
        console.log("Ocurrió un error")
        res.status(500).json({
            message: `Error: ${error}`
        })
    }
}
export const postPedido = async (req, res) => {
    console.log("body postPedido:", req.body)
    const { id_empresa, id_usuario, id_cliente, id_direccion, id_pedido_estatus, id_tipo_pedido, total, importe_pagado, saldo, fecha_creacion, fecha_actualizacion,
        motivo_cancelacion,
        pedido_detalle, pedido_formas_de_pago, pedido_domicilio, id_cajero } = req.body

    try {
        const [rows] = await pool.query("CALL postPedido(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", 
            [id_empresa, id_usuario, id_cliente, id_direccion, id_pedido_estatus, id_tipo_pedido, 
            total, importe_pagado, saldo, fecha_creacion, fecha_actualizacion, motivo_cancelacion, JSON.stringify(pedido_detalle), 
            JSON.stringify(pedido_formas_de_pago), JSON.stringify(pedido_domicilio), id_cajero])

        // Extrae el id_pedido generado
        const id_pedido = rows[0][0]?.id_pedido;

        if (!id_pedido) {
            return res.status(404).json({
                message: "No se pudo generar el pedido"
            });
        }  
        
        return res.status(200).json({
            message: "Pedido generado exitosamente",
            id_pedido: id_pedido // Devuelve el ID del pedido generado
        });        

    } catch (error) {
        console.log("Ocurrió un error")
        res.status(500).json({
            message: `Error: ${error}`
        })
    }
}
export const getPedidoDetalle = async (req, res) => {
    console.log("getPedidoDetalle:", req.query)
    try {
        const { id_empresa, id_usuario } = req.query
        //console.log(limite, pagina)

        const rows = await pool.query(`CALL getPedidoDetalle(?, ?);`, [id_empresa, id_usuario])

        res.status(200).json({
            success: true,
            pedidos: rows[0][0]
        })
    } catch (error) {
        res.status(500).json({
            error: "An error ocurred"
        })
    }
}
export const getPedidoCanvas = async (req, res) => {
    console.log("getPedidoCanvas:", req.query)
    try {
        const { id_empresa } = req.query
        //console.log(limite, pagina)

        const rows = await pool.query(`CALL getPedidoCanvas(?);`, [id_empresa])

        res.status(200).json({
            success: true,
            pedidos: rows[0][0]
        })
    } catch (error) {
        res.status(500).json({
            error: "An error ocurred"
        })
    }
}
export const putPedidoEstatus = async (req, res) => {
    console.log("body putPedidoEstatus:", req.body)
    const { id_empresa, id_pedido, id_pedido_estatus } = req.body

    try {
        const [result] = await pool.query("CALL putPedidoEstatus(?, ?, ?)", [id_empresa, id_pedido, id_pedido_estatus])

        if (result.affectedRows == 0) {
            res.status(404).json({
                message: "No se realizó actualización"
            })
        } else {
            return res.status(200).json({
                message: "Estatus pedido actualizado exitosamente"
            })
        }
    } catch (error) {
        console.log("Ocurrió un error")
        res.status(500).json({
            message: `Error: ${error}`
        })
    }
}

export const getTipoPedido = async (req, res) => {
    console.log("getTipoPedido:", req.query)
    try {
        const { id_empresa } = req.query

        const rows = await pool.query(`CALL getTipoPedido(?);`, [id_empresa])

        res.status(200).json({
            success: true,
            tipoPedido: rows[0][0]
        })
    } catch (error) {
        res.status(500).json({
            error: "An error ocurred"
        })
    }
}
export const getColoniasDelivery = async (req, res) => {
    console.log("getColoniasDelivery:", req.query)
    try {
        const { id_empresa } = req.query

        const rows = await pool.query(`CALL getColoniasDelivery(?);`, [id_empresa])

        res.status(200).json({
            success: true,
            colonias: rows[0][0]
        })
    } catch (error) {
        res.status(500).json({
            error: "An error ocurred"
        })
    }
}
export const getCajeros = async (req, res) => {
    console.log("getCajeros:", req.query)
    try {
        const { id_empresa } = req.query

        const rows = await pool.query(`CALL getCajeros(?);`, [id_empresa])

        res.status(200).json({
            success: true,
            cajeros: rows[0][0]
        })
    } catch (error) {
        res.status(500).json({
            error: "An error ocurred"
        })
    }
}
export const getCaja = async (req, res) => {
    console.log("getCaja:", req.query)
    try {
        const { id_empresa, ip } = req.query

        const rows = await pool.query(`CALL getCaja(?, ?);`, [id_empresa, ip])

        res.status(200).json({
            success: true,
            caja: rows[0][0][0]
        })
    } catch (error) {
        res.status(500).json({
            error: "An error ocurred"
        })
    }
}
export const getIP = async (req, res) => {
    try {
        const response = await axios.get("https://api.ipify.org?format=json");
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: `Error al obtener la IP: ${error}` });
    }
}
export const getIPLocal = async (req, res) => {
    try {
        const clientIp = requestIp.getClientIp(req); // Obtiene la IP del cliente
        const ip = clientIp.startsWith("::ffff:") ? clientIp.replace("::ffff:", "") : clientIp;
        console.log("IP del cliente:", ip);
        res.json({ ip: ip });
    } catch (error) {
        res.status(500).json({ error: `Error al obtener la IP: ${error}` });
    }
}


