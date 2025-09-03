import { pool } from "../db.js"

export const getClientesListing = async (req, res) => {

    try {
        //console.log(req.query)
        const { id_empresa, limite, pagina } = req.query
        //console.log(limite, pagina)

        const rows = await pool.query(`CALL getClientesListing(?, ?, ?);`, [id_empresa, limite, pagina])
        //console.log(rows[0][1])
        res.json({
            success: true,
            clientes: rows[0][1],
            totalRegistros: rows[0][0][0].totalRegistros
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            error: `An error ocurred: ${error.message}`
        })
    }
}
export const postCliente = async (req, res) => {
    try {
        const { id_empresa, id_cliente, empresa, nombre, telefonos, celulares } = req.body
        const result = await pool.query(`CALL postCliente(?, ?, ?, ?, ?, ?);`, [id_empresa, id_cliente, empresa, nombre, telefonos, celulares])
        if (result.affectedRows == 0) {
            res.status(404).json({
                success: false,
                message: `Cliente No se actualizó`
            })
        } else {
            return res.status(200).json({
                success: true,
                message: "Cliente actualizado"
            })
        }        
    } catch (error) {
        res.status(500).json({
            success: false,
            error: `An error ocurred: ${error.message}`
        })
    }
}
