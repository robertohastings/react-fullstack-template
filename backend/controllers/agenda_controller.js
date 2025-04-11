import { pool } from "../db.js"
import { authenticateToken } from "../middlewares/authenticateToken.js"

export const getAgendaPorDia = async (req, res) => {
    //console.log("getAgendaPorDia ->", req.query)
    try {
        console.log("getAgendaPorDia ->", req.query)
        const { id_empresa, fecha } = req.query

        const rows = await pool.query(`CALL getAgendaPorDia(?, ?);`, [id_empresa, fecha])

        console.log("rows ->", rows[0][0])

        res.status(200).json({
            success: true,
            agenda: rows[0][0]
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            error: `An error ocurred: ${error}`
        })
    }
}

export const getClientePorTelefonoOCelular = async (req, res) => {
    try {
        console.log("getClientePorTelefonoOCelular ->", req.query)
        const { id_empresa, telefono } = req.query

        const rows = await pool.query(`CALL getClientePorTelefonoOCelular(?, ?);`, [id_empresa, telefono])
        console.log("rows ->", rows[0][0][0])

        res.status(200).json({
            success: true,
            cliente: rows[0][0]
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            error: `An error ocurred: ${error}`
        })
    }
}
export const postAgenda = async (req, res) => {
    console.log("body postAgenda =>", req.body)
    const { id_empresa, fecha, intervalo, id_cliente, nombre_cliente, celular } = req.body

    try {
        const [result] = await pool.query("CALL postAgenda(?, ?, ?, ?, ?, ?)", [id_empresa, fecha, intervalo, id_cliente, nombre_cliente, celular])
        console.log("result ->", result)

        const folioConfirmacion = result[0][0].folio_confirmacion
        //console.log("folio_confirmacion ->", folioConfirmacion)

        if (!folioConfirmacion) {
            res.status(404).json({
                message: "No se pudo generar la cita"
            })
        } else {
            return res.status(200).json({
                message: "Agenda actualizada correctamente",
                folio_confirmacion: folioConfirmacion
            })
        }
    } catch (error) {
        console.log("Ocurrió un error", error)
        res.status(500).json({
            message: `Error: ${error}`
        })
    }
}
export const putAgenda = async (req, res) => {
    console.log("body putAgenda =>", req.body)
    const { id_empresa, id_agenda, intervalo, id_cliente, nombre, fecha, celular } = req.body
    
    try {
        const [result] = await pool.query("CALL putAgenda(?, ?, ?, ?, ?, ?, ?)",
             [id_empresa, id_agenda, intervalo, id_cliente, nombre, fecha, celular])
        //console.log("result ->", result[0][0])

        //const cambioRelizado = result[0][0].cambio_efectuado

        const folioConfirmacion = result[0][0].folio_confirmacion

        if (!folioConfirmacion) {
            res.status(404).json({
                message: "No se pudo generar la cita"
            })
        } else {
            return res.status(200).json({
                message: "Agenda actualizada correctamente",
                folio_confirmacion: folioConfirmacion
            })
        }        

        // if (!cambioRelizado) {
        //     res.status(404).json({
        //         message: "No se pudo actualizar la cita"
        //     })
        // } else {
        //     return res.status(200).json({
        //         message: "Agenda actualizada correctamente"
        //     })
        //}
    } catch (error) {
        res.status(500).json({
            message: `Error: ${error}`
        })
    }
}
export const putAgendaConfirmar = async (req, res) => {
    //console.log("body putAgenda =>", req.body)
    const { id_empresa, id_agenda } = req.body
    
    try {
        const [result] = await pool.query("CALL putAgendaConfirmar(?, ?)", [id_empresa, id_agenda])
        //console.log("result ->", result[0][0])

        const cambioRelizado = result[0][0].cambio_efectuado

        if (!cambioRelizado) {
            res.status(404).json({
                message: "No se pudo actualizar la cita"
            })
        } else {
            return res.status(200).json({
                message: "Agenda actualizada correctamente"
            })
        }
    } catch (error) {
        res.status(500).json({
            message: `Error: ${error}`
        })
    }
}
export const putAgendaCancelar = async (req, res) => {
    //console.log("body putAgenda =>", req.body)
    const { id_empresa, id_agenda } = req.body
    
    try {
        const [result] = await pool.query("CALL putAgendaCancelar(?, ?)", [id_empresa, id_agenda])
        //console.log("result ->", result[0][0])

        const cambioRelizado = result[0][0].cambio_efectuado

        if (!cambioRelizado) {
            res.status(404).json({
                message: "No se pudo actualizar la cita"
            })
        } else {
            return res.status(200).json({
                message: "Agenda actualizada correctamente"
            })
        }
    } catch (error) {
        res.status(500).json({
            message: `Error: ${error}`
        })
    }
}
export const putAgendaCambiaEstatus = async (req, res) => {
    //console.log("body putAgenda =>", req.body)
    const { id_empresa, id_agenda, id_agenda_estatus } = req.body
    
    try {
        const [result] = await pool.query("CALL putAgendaCambiaEstatus(?, ?, ?)", [id_empresa, id_agenda, id_agenda_estatus])
        //console.log("result ->", result[0][0])

        const cambioRelizado = result[0][0].cambio_efectuado

        if (!cambioRelizado) {
            res.status(404).json({
                message: "No se pudo actualizar la cita"
            })
        } else {
            return res.status(200).json({
                message: "Agenda actualizada correctamente"
            })
        }
    } catch (error) {
        res.status(500).json({
            message: `Error: ${error}`
        })
    }
}