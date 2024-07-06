import { pool } from "../db.js"

export const getCategorias = async (req, res) => {
    console.log("here")
    try {
        const { limite, pagina } = req.query
        console.log(limite, pagina)
        // await pool.query(
        //     "CALL getCategoriasByPage(?, ?)",
        //     [limite, pagina], (error, results) => {
        //     if (error) {
        //         console.log("Error executing stored procedure")
        //         res.status(500).json({
        //             error: "An error ocurred"
        //         })
        //         return
        //     }
        //     console.log("results", results)
        //     //return
        //     const totalRegistros = results[0][0].totalRegistros
        //     const data = results[1]
        //     res.json({ status: 200, data, totalRegistros })
        // })

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
