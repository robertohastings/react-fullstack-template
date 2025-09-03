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
    const { id_empresa, id_categoria, nombre, descripcion, imagen, activo } = req.body.params

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
export const getProductosByProveedor = async (req, res) => {
    try {
        console.log('getProductosByProveedor query:', req.query)
        const { id_empresa, id_proveedor } = req.query

        const rows = await pool.query(`CALL getProductosByProveedor(?, ?);`, [id_empresa, id_proveedor])

        res.status(200).json({
            success: true,
            productos: rows[0][0]
        })
    } catch (error) {
        res.status(500).json({
            error: "An error ocurred"
        })
    }
}
export const postProducto = async (req, res) => {
    console.log("Body:", req.body)
    const { id_empresa, id_producto, nombre, descripcion, id_proveedor, id_categoria, precio, precio_promocion, 
            costo, image1, image2, image3, existencia, activo, sku, combo } = req.body
    console.log('backend combo:', JSON.stringify(combo))

    try {
        const [result] = await pool.query("CALL postProducto(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", 
            [id_empresa, id_producto, nombre, descripcion, id_proveedor, id_categoria, precio, 
                precio_promocion, costo, image1, 
                image2, image3, existencia, activo, sku, combo])

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
//Combos
export const getProductosCombo = async (req, res) => {
    try {
        const { id_empresa, id_producto } = req.query

        const rows = await pool.query(`CALL getProductosCombo(?, ?);`, [id_empresa, id_producto])
        console.log('productos:', rows[0][0])
        console.log('combos:', rows[0][1])

        res.json({
            success: true,
            productos: rows[0][0],
            combo: rows[0][1]
        })
    } catch (error) {
        res.status(500).json({
            error: `An error ocurred: ${error.message}`
        })
    }
}
//Kardes
export const getKardex = async (req, res) => {
    try {
        console.log("getKardex params:", req.query)
        const { id_empresa, sku, id_producto, fecha, tipoMovimiento, currentPage, rowsPerPage } = req.query

        const rows = await pool.query(`CALL getKardex(?, ?, ?, ?, ?, ?, ?);`, [id_empresa, sku, id_producto, fecha, tipoMovimiento, currentPage, rowsPerPage])
        console.log('producto:', rows[0][0])
        console.log('movimientos:', rows[0][1])
        console.log('totalRecords:', rows[0][2])

        res.json({
            success: true,
            producto: rows[0][0][0],
            movimientos: rows[0][1],
            totalRecords: rows[0][2]
        })
    } catch (error) {
        res.status(500).json({
            error: `An error ocurred: ${error.message}`
        })
    }
}
//ordecompra_estatus
export const getOrdenCompraEstatus = async (req, res) => {
    try {
        console.log("getOrdenCompraEstatus params:", req.query)
        const { id_empresa } = req.query

        const rows = await pool.query(`CALL getOrdenCompraEstatus(?);`, [id_empresa])
        console.log('ordencomra_estado:', rows[0][0])

        res.json({
            success: true,
            estatus: rows[0][0]
        })
    } catch (error) {
        res.status(500).json({
            error: `An error ocurred: ${error.message}`
        })
    }
}
export const getProveedoresFiltro = async (req, res) => {
    try {
        console.log("getProveedoresFiltro params:", req.query)
        const { id_empresa } = req.query

        const rows = await pool.query(`CALL getProveedoresFiltro(?);`, [id_empresa])
        console.log('proveedores:', rows[0][0])

        res.json({
            success: true,
            proveedores: rows[0][0]
        })
    } catch (error) {
        res.status(500).json({
            error: `An error ocurred: ${error.message}`
        })
    }
}
//Orden De Compra
export const getOrdenDeCompra = async (req, res) => {
    try {

        console.log('req.query:',req.query)
        const { id_empresa, id_ordencompra, fecha_inicial, fecha_final, id_proveedor, id_estado_ordencompra, p_page, p_rows_per_page } = req.query


        const rows = await pool.query(`CALL getOrdenDeCompra(?, ?, ?, ?, ?, ?, ?, ?, @p_totalRecords);`, [
            id_empresa, id_ordencompra, fecha_inicial, fecha_final, id_proveedor, id_estado_ordencompra, p_page, p_rows_per_page
        ]);
        
        // Obtiene los valores de retorno del stored procedure
        const [[result]] = await pool.query("SELECT @p_totalRecords AS totalRecords;");
        const { totalRecords } = result;

        const ordenesDeCompra = rows[0][0];

        console.log('getOrdenDeCompra:', ordenesDeCompra)

        res.json({
            success: true,
            totalRecords,
            ordencompra: ordenesDeCompra,
        })

    } catch (error) {
        res.status(500).json({
            error: `An error ocurred: ${error.message}`
        })
    }
}

export const postOrdenDeCompra = async (req, res) => {
    try {
        const { id_empresa, fecha, id_proveedor, total_orden, id_usuario, ordencompra_detalle } = req.body;
        console.log('postOrdenDeCompra rqe.body:',req.body)
        console.log('ordencompra_detalle rqe.body:', JSON.stringify(ordencompra_detalle))

        // Llama al stored procedure
        const [rows] = await pool.query('CALL postOrdenDeCompra(?, ?, ?, ?, ?, ?, @p_id_ordencompra, @p_codigo_resultado, @p_mensaje_resultado);',
            [id_empresa, fecha, id_proveedor, total_orden, id_usuario, JSON.stringify(ordencompra_detalle)]);

        // Obtiene los valores de retorno del stored procedure
        const [[result]] = await pool.query("SELECT @p_id_ordencompra AS id_ordencompra, @p_codigo_resultado AS codigo_resultado, @p_mensaje_resultado AS mensaje_resultado;");

        const { id_ordencompra, codigo_resultado, mensaje_resultado } = result;
        console.log('postOrdenDeCompra result:', result);

        // Envía la respuesta al cliente
        res.status(201).json({
            success: codigo_resultado,
            id_ordencompra,
            message: mensaje_resultado
        });

    } catch (error) {
        console.error("Error en postOrdenDeCompra:", error);
        res.status(500).json({
            success: false,
            message: `An error occurred: ${error.message}`
        });
    }
};
export const putOrdenDeCompra = async (req, res) => {
    try {
        const { id_empresa, id_ordencompra, fecha, id_proveedor, total_orden, id_estado_ordencompra, id_usuario, ordencompra_detalle } = req.body;

        // Llama al stored procedure
        await pool.query('CALL putOrdenDeCompra(?, ?, ?, ?, ?, ?, ?, ?, @p_codigo_resultado, @p_mensaje_resultado);',
            [id_empresa, id_ordencompra, fecha, id_proveedor, total_orden, id_estado_ordencompra, id_usuario, JSON.stringify(ordencompra_detalle)]);

        // Obtiene los valores de retorno del stored procedure
        const [[result]] = await pool.query("SELECT @p_codigo_resultado AS codigo_resultado, @p_mensaje_resultado AS mensaje_resultado;");

        const { codigo_resultado, mensaje_resultado } = result;

        // Envía la respuesta al cliente
        res.status(200).json({
            success: codigo_resultado === 0,
            message: mensaje_resultado
        });

    } catch (error) {
        console.error("Error en putOrdenDeCompra:", error);
        res.status(500).json({
            success: false,
            message: `An error occurred: ${error.message}`
        });
    }
};
export const deleteOrdenDeCompra = async (req, res) => {
    try {
        const { id_empresa, id_ordencompra, id_usuario } = req.body;
        console.log('deleteOrdenDeCompra req.body', req.body)

        // Llama al stored procedure
        await pool.query('CALL deleteOrdenDeCompra(?, ?, ?, @p_codigo_resultado, @p_mensaje_resultado);',
            [id_empresa, id_ordencompra, id_usuario]);

        // Obtiene los valores de retorno del stored procedure
        const [[result]] = await pool.query("SELECT @p_codigo_resultado AS codigo_resultado, @p_mensaje_resultado AS mensaje_resultado;");

        const { codigo_resultado, mensaje_resultado } = result;
        console.log('deleteOrdenDeCompra result', result)

        // Envía la respuesta al cliente
        res.status(200).json({
            success: codigo_resultado === 0,
            message: mensaje_resultado
        });

    } catch (error) {
        console.error("Error en deleteOrdenDeCompra:", error);
        res.status(500).json({
            success: false,
            message: `An error occurred: ${error.message}`
        });
    }
};
export const putOrdenDeCompraRecibo = async (req, res) => {
    try {
        const { id_empresa, id_ordencompra, id_usuario } = req.body;

        // Llama al stored procedure
        await pool.query('CALL putOrdenDeCompraRecibo(?, ?, ?, @p_codigo_resultado, @p_mensaje_resultado);',
            [id_empresa, id_ordencompra, id_usuario]);

        // Obtiene los valores de retorno del stored procedure
        const [[result]] = await pool.query("SELECT @p_codigo_resultado AS codigo_resultado, @p_mensaje_resultado AS mensaje_resultado;");

        const { codigo_resultado, mensaje_resultado } = result;

        // Envía la respuesta al cliente
        res.status(200).json({
            success: codigo_resultado === 0,
            message: mensaje_resultado
        });

    } catch (error) {
        console.error("Error en putOrdenDeCompraRecibo:", error);
        res.status(500).json({
            success: false,
            message: `An error occurred: ${error.message}`
        });
    }
};