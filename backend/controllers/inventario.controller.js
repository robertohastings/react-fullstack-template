import { pool } from "../db.js"
import { convertirFecha, convertirFechaYYYMMDD } from '../helpers/fecha.js';

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
        console.log('getProductosListado query:', req.query)
        const { limite, pagina, id_categoria, id_proveedor, existencia } = req.query

        const rows = await pool.query(`CALL getProductosListing(?, ?, ?, ?, ?);`, [limite, pagina, id_categoria, id_proveedor, existencia])

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

export const postVisita = async (req, res) => {
    console.log("Body postVisita:", req.body)
    
    const { id_empresa, id_visita, id_cliente, id_usuario, nombre, comentarios, fecha_inicio, fecha_final, latitud, longitud } = req.body
    console.log("Fecha Inicial", fecha_inicio)
    console.log("Fecha Final", fecha_final)

    const fechaInicio = convertirFecha(fecha_inicio)
    console.log('fecha inicia convertida:', fechaInicio)
    const fechaFinal = fecha_final === '' ? null : convertirFecha(fecha_final)

    try {
        const [result] = await pool.query("CALL postVisita(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", [id_empresa, id_visita, id_cliente, id_usuario, nombre, comentarios, 
            fechaInicio, 
            fechaFinal, 
            latitud, longitud])

        if (result.affectedRows == 0) {
            res.status(404).json({
                message: "No se realizó actualización"
            })
        } else {
            return res.status(200).json({
                success: true,
                id_visita: id_visita,
                message: "Visita actualizada"
            })
        }
    } catch (error) {
        console.log(`Ocurrió un error ${error.message}`)
        res.status(500).json({
            message: `Error: ${error}`
        })
    }
}
export const getVisitasByIdUsuario = async (req, res) => {
    console.log("From Flutter getVisitasByIdUsuario:", req.query)
    try {
        const { id_empresa, id_usuario } = req.query
        //console.log(limite, pagina)

        const rows = await pool.query(`CALL getVisitasByIdUsuario(?, ?);`, [id_empresa, id_usuario])

        res.status(200).json({
            success: true,
            visitas: rows[0][0]
        })
    } catch (error) {
        res.status(500).json({
            error: `An error ocurred: ${error.message}`
        })
    }
}
export const getJornadaLaboral = async (req, res) => {
    console.log("From Flutter getJornadaLaboral:", req.query)
    try {
        const { id_empresa, fecha, id_usuario } = req.query
        //console.log(limite, pagina)

        const rows = await pool.query(`CALL getJornadaLaboral(?, ?, ?);`, [id_empresa, fecha, id_usuario])

        res.status(200).json({
            success: true,
            jornada: rows[0][0]
        })
        console.log(rows[0][0]);
    } catch (error) {
        res.status(500).json({
            error: `An error ocurred: ${error.message}`
        })
    }
}
export const postJornadaLaboral = async (req, res) => {
    console.log("Body postJornadaLaboraltVisita:", req.body)
    
    const { id_empresa, fecha, id_usuario, id_jornada_laboral, inicio_jornada, fin_jornada, inicio_comida, fin_comida } = req.body

    const fechaJornada = fecha ? convertirFecha(fecha) : null;
    const inicioJornada = inicio_jornada ? convertirFecha(inicio_jornada) : null;
    const finJornada = fin_jornada ? convertirFecha(fin_jornada) : null;


    console.log(`fechaJornada: ${fechaJornada}`)
    console.log(`inicioJornada: ${inicioJornada}`)
    console.log(`finJornada: ${finJornada}`)

    try {
        const rows = await pool.query("CALL postJornadaLaboral(?, ?, ?, ?, ?, ?, ?, ?)",
             [id_empresa, fechaJornada, id_usuario, id_jornada_laboral, 
                inicioJornada, finJornada, 
            inicio_comida, 
            fin_comida])

        res.status(200).json({
            success: true,
            jornada: rows[0][0]
        })
        //console.log(rows)
        //console.log(rows[0]);
        console.log(rows[0][0]);
    
    } catch (error) {
        console.log(error.message)
        res.status(500).json({
            error: `An error ocurred: ${error.message}`
        })
    }
}
export const postGeoLocalizacion = async (req, res) => {
    console.log("Body GeoLocalizacion:", req.body)
    const { id_empresa, id_usuario, fecha, id_localidad, hora, latitud, longitud } = req.body

    try {
        const [result] = await pool.query("CALL postGeoLocalizacion(?, ?, ?, ?, ?, ?, ?)", [id_empresa, id_usuario, fecha, id_localidad, hora, latitud, longitud])

        if (result.affectedRows == 0) {
            res.status(404).json({
                message: "No se realizó actualización"
            })
        } else {
            return res.status(200).json({
                message: "Localización actualizada"
            })
        }
        //
    } catch (error) {
        console.log("Ocurrió un error")
        res.status(500).json({
            message: `Error: ${error}`
        })
    }
}