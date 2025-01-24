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
        console.log('here')
        //const { id_empresa, id_landingPage, hostname } = req.query
        const { hostname } = req.query
        //const rows = await pool.query(`CALL getLandingPage( ?, ?, ?);`, [id_empresa, id_landingPage, hostname])
        const rows = await pool.query(`CALL getLandingPage( ? );`, [hostname])
        //console.log(rows[0][0][0]);
        const data = {
            success: true,
            landingPage: {
                idEmpresa: rows[0][0][0].id_empresa,
                idLandingPage: rows[0][0][0].id_landingPage,
                quienesSomos: rows[0][0][0].quienes_somos,
                servicios: rows[0][0][0].servicios,
                productos: rows[0][0][0].productos,
                categorias: rows[0][1],
                settings: {
                    mostrar_quienes_somos: rows[0][0][0].mostrar_quienes_somos,
                    mostrar_productos: rows[0][0][0].mostrar_productos,
                    mostrar_servicios: rows[0][0][0].mostrar_servicios,
                    mostrar_contactanos: rows[0][0][0].mostrar_contactanos,
                    mostrar_sitioEnMantenimiento: rows[0][0][0].mostrar_sitioEnMantenimiento
                }
            }
        }
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
    //console.log("here 2")
    try {
        const { limite, pagina } = req.query
        console.log(limite, pagina)

        const rows = await pool.query(`CALL getPuntosDeEntrega(?, ?);`, [limite, pagina])

        //console.log(rows)

        //console.log("rows:", rows[0][0][0])

        //console.log("rows:", rows[0][1])
        res.json({
            success: true,
            puntosDeEntrega: rows[0][1],
            totalRegistros: rows[0][0][0].totalRegistros
        })
    } catch (error) {
        res.status(500).json({
            error: `An error ocurred: ${error.message}`
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
