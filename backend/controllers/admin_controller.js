import { pool } from "../db.js"

export const putLandingPage = async (req, res) => {
    const { id_empresa, id_landingPage } = req.params
    const { quienes_somos, servicios, productos, mostrar_quienes_somos, mostrar_productos, mostrar_servicios, mostrar_contactanos } = req.body

    try {
        const [result] = await pool.query("CALL putLandingPage(?, ?, ?, ?, ?, ?, ?, ?, ?)", [id_empresa, id_landingPage, quienes_somos, servicios, productos, mostrar_quienes_somos, mostrar_productos, mostrar_servicios, mostrar_contactanos])

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
