import { pool } from "../db.js"

//Categorias
export const getCategoriasListado = async (req, res) => {
    //console.log("here")
    try {
        const { limite, pagina } = req.query
        //console.log(limite, pagina)

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

export const postCategoria = async (req, res) => {
    //console.log("Body:", req.body)
    const { id_empresa, id_categoria, nombre, descripcion, imagen, activo } = req.body

    try {
        const [result] = await pool.query("CALL postCategorias(?, ?, ?, ?, ?, ?)", [id_empresa, id_categoria, nombre, descripcion, imagen, activo])

        if (result.affectedRows == 0) {
            res.status(404).json({
                message: "No se realizó actualización"
            })
        } else {
            return res.status(200).json({
                message: "Categoria actualizada"
            })
        }

        // return res.status(200).json({
        //     message: "Categoria actualizada"
        // })
    } catch (error) {
        console.log("Ocurrió un error")
        res.status(500).json({
            message: `Error: ${error}`
        })
    }
}

//Productos
export const getProductosListado = async (req, res) => {
    try {
        const { limite, pagina } = req.query

        const rows = await pool.query(`CALL getProductosListing(?, ?);`, [limite, pagina])

        res.status(200).json({
            success: true,
            productos: rows[0][1],
            totalRegistros: rows[0][0][0].totalRegistros
        })
    } catch (error) {
        res.status(500).json({
            error: "An error ocurred"
        })
    }
}
export const postProducto = async (req, res) => {
    console.log("Body:", req.body)
    const { id_empresa, id_producto, nombre, descripcion, id_proveedor, id_categoria, precio, precio_promocion, costo, image1, image2, image3, existencia, activo, sku } = req.body

    try {
        const [result] = await pool.query("CALL postProducto(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", [id_empresa, id_producto, nombre, descripcion, id_proveedor, id_categoria, precio, precio_promocion, costo, image1, image2, image3, existencia, activo, sku])

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
        console.log(`Ocurrió un error ${error.message}`)
        res.status(500).json({
            message: `Error: ${error}`
        })
    }
}
