import { pool } from "../db.js"

export const getProductosByCategoria = async (req, res) => {
    try {
        const { id_empresa, id_categoria } = req.query
        const rows = await pool.query(`CALL getProductosByCategoria(?, ?)`, [id_empresa, id_categoria])

        const data = {
            success: true,
            productos: rows[0][0],
            numeroRegistros: rows[0][0].length
        }
        res.json(data)
    } catch (error) {
        console.log("Error fectching the data ", error)
    }
}

export const getLandingPage = async (req, res) => {
    try {
        console.log("here")
        //const { id_empresa, id_landingPage, hostname } = req.query
        const { hostname } = req.query
        console.log("getLandingPage -> hostname", hostname)
        //const rows = await pool.query(`CALL getLandingPage( ?, ?, ?);`, [id_empresa, id_landingPage, hostname])
        const rows = await pool.query(`CALL getLandingPage( ? );`, [hostname])
        //console.log(rows[0][0][0]);
        const data = {
            success: true,
            landingPage: {
                idEmpresa: rows[0][0][0].id_empresa,
                idLandingPage: rows[0][0][0].id_landingPage,
                inicioTitulo: rows[0][0][0].inicio_titulo,
                inicioDescripcion: rows[0][0][0].inicio_descripcion,
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

export const getCategorias = async (req, res) => {
    //console.log("here")
    try {
        const { limite, pagina } = req.query
        console.log(limite, pagina)

        const rows = await pool.query(`CALL getCategorias(?, ?);`, [limite, pagina])

        //console.log("rows:", rows[0][0][0])

        //console.log("rows:", rows[0][1])
        res.json({
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

export const getPuntosDeEntrega = async (req, res) => {

    try {
        console.log(req.query)
        const { id_empresa, limite, pagina } = req.query
        console.log(limite, pagina)

        const rows = await pool.query(`CALL getPuntosDeEntrega(?, ?, ?);`, [id_empresa, limite, pagina])
        console.log(rows[0][1])
        res.json({
            success: true,
            puntosDeEntrega: rows[0][1],
            totalRegistros: rows[0][0][0].totalRegistros
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            error: `An error ocurred: ${error.message}`
        })
    }
}

export const postPuntoDeEntrega = async (req, res) => {
    console.log("postPuntosDeEntrega",req.body)
    const { id_empresa, id_puntoDeEntrega, nombre, horario, activo } = req.body

    try {
        const [result] = await pool.query("CALL postPuntoDeEntrega(?, ?, ?, ?, ?)", [id_empresa, id_puntoDeEntrega, nombre, horario, activo])
        if (result.affectedRows == 0) {
            res.status(404).json({
                success: false,
                message: `Punto de entrega No se actualizó`
            })
        } else {
            return res.status(200).json({
                success: true,
                message: "Punto de entrega actualizado"
            })
        }
    } catch (error) {
        res.status(500).json({
            message: `Error: ${error.message}`
        })
    }
}

export const getColoniasDeliveryListing = async (req, res) => {

    try {
        console.log(req.query)
        const { id_empresa, limite, pagina } = req.query
        console.log(limite, pagina)

        const rows = await pool.query(`CALL getColoniasDeliveryListing(?, ?, ?);`, [id_empresa, limite, pagina])
        console.log(rows[0][1])
        res.json({
            success: true,
            coloniasDelivery: rows[0][1],
            totalRegistros: rows[0][0][0].totalRegistros
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            error: `An error ocurred: ${error.message}`
        })
    }
}
export const postColoniaDelivery = async (req, res) => {
    //console.log("postPuntosDeEntrega")
    //console.log("body:", req.body)
    const { id_empresa, id_colonia, nombre, cargo, activo } = req.body

    try {
        const [result] = await pool.query("CALL postColoniaDelivery(?, ?, ?, ?, ?)", [id_empresa, id_colonia, nombre, cargo, activo])
        if (result.affectedRows == 0) {
            res.status(404).json({
                success: false,
                message: `Colonia de entrega No se actualizó`
            })
        } else {
            return res.status(200).json({
                success: true,
                message: "Colonia de entrega actualizada"
            })
        }
    } catch (error) {
        //console.log("Ocurrió un error")
        res.status(500).json({
            message: `Error: ${error.message}`
        })
    }
}
export const getCajeroListing = async (req, res) => {

    try {
        console.log(req.query)
        const { id_empresa, limite, pagina } = req.query
        console.log(limite, pagina)

        const rows = await pool.query(`CALL getCajeroListing(?, ?, ?);`, [id_empresa, limite, pagina])
        console.log(rows[0][1])
        res.json({
            success: true,
            cajeros: rows[0][1],
            totalRegistros: rows[0][0][0].totalRegistros
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            error: `An error ocurred: ${error.message}`
        })
    }
}

export const postCajero = async (req, res) => {
    const { id_empresa, id_cajero, nombre, password, activo } = req.body

    try {
        const [result] = await pool.query("CALL postCajero(?, ?, ?, ?, ?)", [id_empresa, id_cajero, nombre, password, activo])
        if (result.affectedRows == 0) {
            res.status(404).json({
                success: false,
                message: `Cajero No se actualizó`
            })
        } else {
            return res.status(200).json({
                success: true,
                message: "Cajero actualizado"
            })
        }
    } catch (error) {
        //console.log("Ocurrió un error")
        res.status(500).json({
            message: `Error: ${error.message}`
        })
    }
}

export async function apiLanding(req, res) {
    const data = {
        aboutUs: {
            titulo: "About Us",
            activo: true,
            contenido: "<p>Lorem itsu lorem itsu. lorem itus.</p><ol><li>One</li><li>Two</li><br></ol>"
        },
        products: {
            titulo: "Nuestros productos",
            activo: true,
            contenido: "<p><strong>Lorem</strong> ipsum dolor sit amet consectetur adipisicing elit. Voluptas aliquam nemo laboriosam consectetur ut voluptatem ad, saepe tenetur porro repudiandae recusandae exercitationem eveniet quia mollitia dolorem. Quidem delectus voluptatibus fuga?</p><p><strong>Lorem</strong> ipsum dolor sit amet consectetur adipisicing elit. Voluptas aliquam nemo laboriosam consectetur ut voluptatem ad, saepe tenetur porro repudiandae recusandae exercitationem eveniet quia mollitia dolorem. Quidem delectus voluptatibus fuga?</p>"
        },
        services: {
            titulo: "Nuestros servicios",
            activo: true,
            contenido: "<p><strong>Lorem</strong> ipsum dolor sit amet consectetur adipisicing elit. Voluptas aliquam nemo laboriosam consectetur ut voluptatem ad, saepe tenetur porro repudiandae recusandae exercitationem eveniet quia mollitia dolorem. Quidem delectus voluptatibus fuga?</p><p><strong>Lorem</strong> ipsum dolor sit amet consectetur adipisicing elit. Voluptas aliquam nemo laboriosam consectetur ut voluptatem ad, saepe tenetur porro repudiandae recusandae exercitationem eveniet quia mollitia dolorem. Quidem delectus voluptatibus fuga?</p>"
        },
        categories: [
            {
                id: 1,
                descripcion: "Cillum 1 ullamco dolore commodo velit ut"
            },
            {
                id: 2,
                descripcion: "Cillum 2 ullamco dolore commodo velit ut"
            },
            {
                id: 3,
                descripcion: "Cillum 3 ullamco dolore commodo velit ut"
            },
            {
                id: 4,
                descripcion: "Cillum 4 ullamco dolore commodo velit ut"
            },
            {
                id: 5,
                descripcion: "Cillum 5 ullamco dolore commodo velit ut"
            }
        ]
    }
    await res.send(data)
}
//Colonias Delivery
// export const getColoniasDelivery = async (req, res) => {    
//     try {
//         const { id_empresa, limite, pagina } = req.query
//         console.log("getColoniasDelivery -> id_empresa:", id_empresa, "limite:", limite, "pagina:", pagina)

//         const rows = await pool.query(`CALL getColoniasDelivery(?, ?, ?);`, [id_empresa, limite, pagina])
//         console.log("getColoniasDelivery -> rows:", rows[0][1])

//         res.json({
//             success: true,
//             coloniasDelivery: rows[0][1],
//             totalRegistros: rows[0][0][0].totalRegistros
//         })
//     } catch (error) {
//         console.error("Error fetching colonias delivery:", error)
//         res.status(500).json({
//             success: false,
//             error: `An error ocurred: ${error.message}`
//         })
//     }
// }
