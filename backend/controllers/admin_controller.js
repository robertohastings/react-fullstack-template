import { pool } from "../db.js"

export const putLandingPage = async (req, res) => {
    const { id_empresa, id_landingPage } = req.params
    const { quienes_somos, servicios, productos, mostrar_quienes_somos, mostrar_productos, mostrar_servicios, mostrar_contactanos } = req.body

    try {
        const [result] = await pool.query("CALL putLandingPage(?, ?, ?, ?, ?, ?, ?, ?, ?)", [id_empresa, id_landingPage, quienes_somos, servicios, productos, mostrar_quienes_somos, mostrar_productos, mostrar_servicios, mostrar_contactanos])

        if (result.affectedRows == 0) {
            res.status(404).json({
                message: "No se realizó actualización"
            })
        } else {
            return res.status(200).json({
                message: "Landing paga actualizada"
            })
        }
    } catch (error) {
        console.log("Ocurrió un error")
        res.status(500).json({
            message: `Error: ${error}`
        })
    }
}

export const putLandingPage_QuienesSomos = async (req, res) => {
    //console.log("Entre al controlador")
    //console.log(req)
    //const { id_empresa, id_landingPage } = req.params
    console.log("body:", req.body)
    const { id_empresa, id_landingPage, quienes_somos } = req.body

    console.log("empresa:", id_empresa, " landingPag: ", id_landingPage, "quienes somos:", quienes_somos)

    try {
        const [result] = await pool.query("CALL putLandingPage_QuienesSomos(?, ?, ?)", [id_empresa, id_landingPage, quienes_somos])

        if (result.affectedRows == 0) {
            res.status(404).json({
                message: "No se realizó actualización"
            })
        } else {
            return res.status(200).json({
                message: "Landing paga actualizada"
            })
        }
    } catch (error) {
        console.log("Ocurrió un error")
        res.status(500).json({
            message: `Error: ${error}`
        })
    }
}

export const putLandingPage_Productos = async (req, res) => {
    const { id_empresa, id_landingPage, productos } = req.body

    try {
        const [result] = await pool.query("CALL putLandingPage_Productos(?, ?, ?)", [id_empresa, id_landingPage, productos])

        if (result.affectedRows == 0) {
            res.status(404).json({
                message: "Landing Productos No se actualizó"
            })
        } else {
            return res.status(200).json({
                message: "Landing Productos actualizada"
            })
        }
    } catch (error) {
        console.log("Ocurrió un error")
        res.status(500).json({
            message: `Error: ${error}`
        })
    }
}

export const putLandingPage_Servicios = async (req, res) => {
    const { id_empresa, id_landingPage, servicios } = req.body

    try {
        const [result] = await pool.query("CALL putLandingPage_Servicios(?, ?, ?)", [id_empresa, id_landingPage, servicios])

        if (result.affectedRows == 0) {
            res.status(404).json({
                message: "Landing Servicios No se actualizó"
            })
        } else {
            return res.status(200).json({
                message: "Landing Servicios actualizada"
            })
        }
    } catch (error) {
        console.log("Ocurrió un error")
        res.status(500).json({
            message: `Error: ${error}`
        })
    }
}
