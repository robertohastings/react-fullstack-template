import { pool } from "../db.js"

export const getCategoriasListado = async (req, res) => {
    //console.log("here")
    try {
        const { limite, pagina } = req.query
        console.log(limite, pagina)

        const rows = await pool.query(`CALL getCategorias(?, ?);`, [limite, pagina])

        res.status(200).json({
            success: true,
            categorias: rows[0][1],
            totalRegistros: rows[0][0][0].totalRegistros
        })
    } catch (error) {
        res.status(500).json({
            error: "An error ocurred"
        })
    }
}
