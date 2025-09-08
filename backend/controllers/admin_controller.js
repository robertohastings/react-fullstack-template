import { pool } from "../db.js"
import axios from "axios"
import requestIp from 'request-ip'

export const getLandingPageAdmin = async (req, res) => {
    try {
        const { hostname } = req.query
        console.log("getLandingPage -> hostname", hostname)
        //const rows = await pool.query(`CALL getLandingPage( ?, ?, ?);`, [id_empresa, id_landingPage, hostname])
        const rows = await pool.query(`CALL getLandingPage( ? );`, [hostname])
        console.log(rows[0][0][0]);
        const data = {
            success: true,
            landingPage: {
                idEmpresa: rows[0][0][0].id_empresa,
                idLandingPage: rows[0][0][0].id_landingPage,
                inicioTitulo: rows[0][0][0].inicio_titulo,
                inicioDescripcion: rows[0][0][0].inicio_descripcion,
                descripcion: rows[0][0][0].descripcion,
                quienesSomos: rows[0][0][0].quienes_somos,
                servicios: rows[0][0][0].servicios,
                productos: rows[0][0][0].productos,
                categorias: rows[0][1],
                menuLanding: rows[0][2],
                tipoPedido: rows[0][3],
                formasDePago: rows[0][4],
                settings: {
                    mostrar_quienes_somos: rows[0][0][0].mostrar_quienes_somos,
                    mostrar_productos: rows[0][0][0].mostrar_productos,
                    mostrar_productos_verMas: rows[0][0][0].mostrar_productos_verMas,
                    mostrar_servicios: rows[0][0][0].mostrar_servicios,
                    mostrar_contactanos: rows[0][0][0].mostrar_contactanos,
                    mostrar_sitioEnMantenimiento: rows[0][0][0].mostrar_sitioEnMantenimiento,
                    mostrar_landingPage: rows[0][0][0].mostrar_landingPage,
                    mostrar_carritoDeCompras: rows[0][0][0].mostrar_carritoDeCompras                    
                }
            }
        }
        console.log("getLandingPage -> data", data.landingPage)
        res.json(data)
    } catch (error) {
        console.log("Error fectching the data ", error)
        res.status(500).json({
            error: error
        })
    }
}

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
    const { id_empresa, id_landingPage, quienes_somos, inicio_titulo, inicio_descripcion } = req.body

    try {
        const [result] = await pool.query("CALL putLandingPage_QuienesSomos(?, ?, ?, ?, ?)", [id_empresa, id_landingPage, quienes_somos, inicio_titulo, inicio_descripcion])

        if (result.affectedRows == 0) {
            res.status(404).json({
                success: false,
                message: "No se realizó actualización"
            })
        } else {
            return res.status(200).json({
                success: true,
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
                success: false,
                message: "Landing Productos No se actualizó"
            })
        } else {
            return res.status(200).json({
                success: true,
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
                success: false,
                message: "Landing Servicios No se actualizó"
            })
        } else {
            return res.status(200).json({
                success: true,
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
    console.log("putLandingPage_Settings body:", req.body)
    const { id_empresa, id_landingPage, mostrar_quienes_somos, mostrar_productos, mostrar_productos_verMas, mostrar_servicios, mostrar_contactanos, 
        mostrar_sitioEnMantenimiento, mostrar_carritoDeCompras } = req.body

    try {
    const { id_empresa, id_landingPage, mostrar_quienes_somos, mostrar_productos, mostrar_productos_verMas, mostrar_servicios, mostrar_contactanos, mostrar_sitioEnMantenimiento, mostrar_carritoDeCompras } = req.body
        const [result] = await pool.query("CALL putLandingPage_Settings(?, ?, ?, ?, ?, ?, ?, ?, ?)", [id_empresa, id_landingPage, mostrar_quienes_somos, mostrar_productos, mostrar_productos_verMas, mostrar_servicios, 
            mostrar_contactanos, mostrar_sitioEnMantenimiento, mostrar_carritoDeCompras])
        console.log('result:', result)
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
                success: false,
                message: `Puntos de acceso No se actualizó`
            })
        } else {
            return res.status(200).json({
                success: true,
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
    console.log('here')
    //console.log("postPuntosDeEntrega")
    console.log("putUsuario body:", req.body)
    const { id_empresa, id_usuario, nombre, apellidos, celular, fecha_nacimiento } = req.body.params

    try {
        const [result] = await pool.query("CALL putUsuario(?, ?, ?, ?, ?, ?)", [id_empresa, id_usuario, nombre, apellidos, celular, fecha_nacimiento])
        console.log('result:', result)
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
    //console.log("getDirecciones:", req.query)
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

        const rows = await pool.query(`CALL getFormasDePago(?);`, [id_empresa])

        res.status(200).json({
            success: true,
            formasDePago: rows[0][0]
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            error: "An error ocurred"
        })
    }
}
export const putFormasDePago = async (req, res) => {
    //console.log("body putFormasDePago:", req.body)
    const { id_empresa, formasDePago } = req.body
    console.log("id_empresa", id_empresa)
    console.log("formasDePago", formasDePago)

    try {
        const [result] = await pool.query("CALL putFormasDePago(?, ?)", [id_empresa, JSON.stringify(formasDePago)])

        if (result.affectedRows == 0) {
            res.status(404).json({
                success: false,
                message: "No se realizó actualización"
            })
        } else {
            return res.status(200).json({
                success: true,
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
        pedido_detalle, pedido_formas_de_pago, pedido_domicilio, id_cajero, id_caja } = req.body

    try {
        const [rows] = await pool.query("CALL postPedido(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", 
            [id_empresa, id_usuario, id_cliente, id_direccion, id_pedido_estatus, id_tipo_pedido, 
            total, importe_pagado, saldo, fecha_creacion, fecha_actualizacion, motivo_cancelacion, JSON.stringify(pedido_detalle), 
            JSON.stringify(pedido_formas_de_pago), JSON.stringify(pedido_domicilio), id_cajero, id_caja])

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
    //console.log("getPedidoDetalle:", req.query.params)
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
export const postCajaAbrir = async (req, res) => {
    console.log("body postCajaAbrir:", req.body)
    const { id_empresa, ip,  id_cajero, password, importe, motivo } = req.body

    try {
        const [rows] = await pool.query("CALL postCajaAbrir(?, ?, ?, ?, ?, ?)", 
            [id_empresa, ip, id_cajero, password, importe, motivo])

        // Extrae el id_pedido generado
        console.log(`rows: ${rows[0][0]}`)
        // const id_caja = rows[0]?.[0]?.id_caja;
        // console.log(`id_caja: ${id_caja}`)

        // Verificar si se devolvió algún registro
        if (!rows[0] || rows[0].length === 0) {
            return res.status(404).json({
                mensaje: "No se pudo abrir la caja",
            });
        }

        // Extraer el registro devuelto
        const { error, mensaje, id_caja } = rows[0][0];
        console.log(`id_caja: ${id_caja}, error: ${error}, mensaje: ${mensaje}`)

        // Si hay un error por validación (error === 0), devolver el mensaje
        if (error === 0) {
            return res.status(400).json({
                mensaje
            });
        }

        // Si no hay error, devolver el ID de la caja
        return res.status(200).json({
            mensaje,
            id_caja
        });
             

    } catch (error) {
        console.log("Ocurrió un error en postCajaAbrir")
        res.status(500).json({
            mensaje: `Error: ${error.message}`
        })
    }
}
export const postCajaMovimientos = async (req, res) => {
    console.log("body postCajaMovimientos:", req.body)
    const { id_empresa, id_caja, id_cajero, password, ingesoOEgreso, importe, motivo } = req.body

    try {
        const [rows] = await pool.query("CALL postCajaMovimientos(?, ?, ?, ?, ?, ?, ?)", 
            [id_empresa, id_caja, id_cajero, password, ingesoOEgreso, importe, motivo])

        console.log(`rows: ${JSON.stringify(rows[0][0])}`)

        // Verificar si se devolvió algún registro
        if (!rows[0] || rows[0].length === 0) {
            return res.status(404).json({
                mensaje: "No se pudo generar el movimiento en caja",
            });
        }

        // Extraer el registro devuelto
        const { error, mensaje, id_caja: cajaId, partida, nombre_cajero } = rows[0][0];
        console.log(`id_caja: ${cajaId}, error: ${error}, mensaje: ${mensaje}, partida: ${partida}, nombre_cajero: ${nombre_cajero}`)

        // Si hay un error por validación (error === 0), devolver el mensaje
        if (error === 1) {
            return res.status(400).json({
                message: mensaje
            });
        }

        // Si no hay error, devolver el ID de la caja
        return res.status(200).json({
            mensaje,
            id_caja: cajaId,
            partida,
            nombre_cajero
        });
             

    } catch (error) {
        console.log("Ocurrió un error en postCajaMovimientos")
        res.status(500).json({
            mensaje: `Error: ${error.message}`
        })
    }
}
export const postCajaCerrar = async (req, res) => {
    console.log("body postCajaCerrar:", req.body)
    const { id_empresa, id_caja, id_cajero, password, importe, motivo, formasDePago, sumaImportesFormaDePago, efectivoEnCaja} = req.body

    console.log("formasDePago:", JSON.stringify(formasDePago))

    try {
        const [rows] = await pool.query("CALL postCajaCerrar(?, ?, ?, ?, ?, ?, ?, ?, ?)", 
            [id_empresa, id_caja, id_cajero, password, importe, motivo, e, sumaImportesFormaDePago, efectivoEnCaja])

        console.log(`rows: ${JSON.stringify(rows[0][0])}`)

        // Verificar si se devolvió algún registro
        if (!rows[0] || rows[0].length === 0) {
            return res.status(404).json({
                mensaje: "No se pudo generar el movimiento en caja",
            });
        }

        // Extraer el registro devuelto
        const { error, mensaje, id_caja: cajaId, partida, nombre_cajero, cajaAbierta } = rows[0][0];
        console.log(`
            id_caja: ${cajaId}, 
            error: ${error}, 
            mensaje: ${mensaje}, 
            partida: ${partida}, 
            nombre_cajero: ${nombre_cajero}
            cajaAbierta: ${cajaAbierta}
        `)

        // Si hay un error por validación (error === 0), devolver el mensaje
        if (error === 1) {
            return res.status(400).json({
                message: mensaje
            });
        }

        // Si no hay error, devolver el ID de la caja
        return res.status(200).json({
            mensaje,
            id_caja: cajaId,
            partida,
            nombre_cajero,
            cajaAbierta
        });
             

    } catch (error) {
        console.log("Ocurrió un error en postCajaMovimientos")
        res.status(500).json({
            mensaje: `Error: ${error.message}`
        })
    }
}
export const getMovimientosDeCaja = async (req, res) => {
    try {
        console.log("getMovimientosDeCaja:", req.query)
        const { id_empresa, fecha_inicial, fecha_final } = req.query

        const rows = await pool.query(`CALL getMovimientosDeCaja(?, ?, ?);`, [id_empresa, fecha_inicial, fecha_final])
        console.log(rows[0][0])

        res.json({
            success: true,
            movimientosCaja: rows[0][0]
        })
    } catch (error) {
        res.status(500).json({
            error: `An error ocurred: ${error.message}`
        })
    }
}
export const getPedidosPorIdCaja = async (req, res) => {
    try {
        const { id_empresa, id_caja } = req.query

        const rows = await pool.query(`CALL getPedidosPorIdCaja(?, ?);`, [id_empresa, id_caja])
        console.log(rows[0][0])

        res.json({
            success: true,
            pedidoCaja: rows[0][0]
        })
    } catch (error) {
        res.status(500).json({
            error: `An error ocurred: ${error.message}`
        })
    }
}
export const getMenu = async (req, res) => {

    try {
        console.log(req.query)
        const { id_empresa, id_padre, limite, pagina } = req.query
        console.log(limite, pagina)

        const rows = await pool.query(`CALL getMenu(?, ?, ?, ?);`, [id_empresa, id_padre, limite, pagina])
        console.log(rows[0][1])
        res.json({
            success: true,
            menu: rows[0][1],
            totalRegistros: rows[0][0][0].totalRegistros
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            error: `An error ocurred: ${error.message}`
        })
    }
}
export const postMenu = async (req, res) => {
    try {
        const { id_empresa, id_procMenu, nombre, orden, activo, linkTo, icono, soloLanding, id_padre} = req.body
        const result = await pool.query("CALL postMenu(?, ?, ?, ?, ?, ?, ?, ?, ?)", [id_empresa, id_procMenu, nombre, orden, activo, linkTo, icono, soloLanding, id_padre])
        res.json({
            success: true,
            message: "Menu creado correctamente",
            data: result[0]
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            error: `An error ocurred: ${error.message}`
        })
    }
}
export const getRolListing = async (req, res) => {
    //console.log("Fetching role listing", req.query)
    try {
        const { id_empresa, limite, pagina } = req.query
        const rows = await pool.query(`CALL getRolListing(?, ?, ?);`, [id_empresa, limite, pagina])
        res.json({
            success: true,
            roles: rows[0][1],
            totalRegistros: rows[0][0][0].totalRegistros
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            error: `An error ocurred: ${error.message}`
        })
    }
}
export const postRol = async (req, res) => {
    try {
        const { id_empresa, id_rol, nombre, activo } = req.body
        const result = await pool.query("CALL postRol(?, ?, ?, ?)", [id_empresa, id_rol, nombre, activo])
        res.json({
            success: true,
            message: "Rol creado correctamente",
            data: result[0]
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            error: `An error ocurred: ${error.message}`
        })
    }
}
export const getModuloListing = async (req, res) => {
    try {
        const { id_empresa, limite, pagina } = req.query
        const rows = await pool.query(`CALL getModuloListing(?, ?, ?);`, [id_empresa, limite, pagina])
        res.json({
            success: true,
            modulos: rows[0][1],
            totalRegistros: rows[0][0][0].totalRegistros
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            error: `An error ocurred: ${error.message}`
        })
    }
}
export const postModulo = async (req, res) => {
    try {
        const { id_empresa, id_modulo, nombre, activo } = req.body
        const result = await pool.query("CALL postModulo(?, ?, ?, ?)", [id_empresa, id_modulo, nombre, activo])
        res.json({
            success: true,
            message: "Modulo creado correctamente",
            data: result[0]
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            error: `An error ocurred: ${error.message}`
        })
    }
}
export const getRolMenuListing = async (req, res) => {
    try {
        const { id_empresa, id_rol, limite, pagina } = req.query
        const rows = await pool.query(`CALL getRolMenuListing(?, ?, ?, ?);`, [id_empresa, id_rol, limite, pagina])
        res.json({
            success: true,
            menu: rows[0][1],
            totalRegistros: rows[0][0][0].totalRegistros
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            error: `An error ocurred: ${error.message}`
        })
    }
}
export const postRolMenu = async (req, res) => {  
    console.log('Request body postRolMenu:', req.body)  
    try {
        const { id_empresa, id_procMenu, id_rol, activo } = req.body
        const result = await pool.query("CALL postRolMenu(?, ?, ?, ?)", [id_empresa, id_procMenu, id_rol, activo])
        res.json({
            success: true,
            message: "RolMenu creado correctamente",
            data: result[0]
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            error: `An error ocurred: ${error.message}`
        })
    }
}
export const getRoles = async (req, res) => {
    try {
        const { id_empresa } = req.query
        const rows = await pool.query(`CALL getRoles(?);`, [id_empresa])
        res.json({
            success: true,
            roles: rows[0][0]
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            error: `An error ocurred: ${error.message}`
        })
    }
}
export const getEmpresasListing = async (req, res) => {
    try {
        const { limite, pagina } = req.query
        const rows = await pool.query(`CALL getEmpresasListing(?, ?);`, [limite, pagina])
        console.log("Response data from getEmpresasListing:", rows[0][1]);
        res.json({
            success: true,
            empresas: rows[0][1],
            totalRegistros: rows[0][0][0].totalRegistros
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            error: `An error ocurred: ${error.message}`
        })
    }
}
export const postEmpresa = async (req, res) => {
    try {
        const { id_empresa, nombre, logo, host, activo } = req.body
        const result = await pool.query("CALL postEmpresa(?, ?, ?, ?, ?)", [id_empresa, nombre, logo, host, activo])
        res.json({
            success: true,
            message: "Empresa creada correctamente",
            data: result[0]
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            error: `An error ocurred: ${error.message}`
        })
    }
}
