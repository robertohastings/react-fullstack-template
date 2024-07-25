import { pool } from "../db.js"

export const getProveedoresListado = async (req, res) => {
    //console.log("here")
    try {
        const { limite, pagina } = req.query
        //console.log(limite, pagina)

        const rows = await pool.query(`CALL getProveedores(?, ?);`, [limite, pagina])

        res.status(200).json({
            success: true,
            proveedores: rows[0][1],
            totalRegistros: rows[0][0][0].totalRegistros
        })
    } catch (error) {
        res.status(500).json({
            error: "An error ocurred"
        })
    }
}
export const postProveedor = async (req, res) => {
    console.log("Body:", req.body)
    const { id_empresa, id_proveedor, nombre, contacto1, contacto2, telefono1, telefono2, whatsapp, email1, email2, horario, activo } = req.body

    try {
        const [result] = await pool.query("CALL postProveedor(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", [id_empresa, id_proveedor, nombre, contacto1, contacto2, telefono1, telefono2, whatsapp, email1, email2, horario, activo])

        if (result.affectedRows == 0) {
            res.status(404).json({
                message: "No se realizó actualización"
            })
        } else {
            return res.status(200).json({
                message: "Producto actualizada"
            })
        }
    } catch (error) {
        console.log("Ocurrió un error")
        res.status(500).json({
            message: `Error: ${error}`
        })
    }
}
