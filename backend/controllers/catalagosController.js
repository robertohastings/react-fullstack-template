import { query } from "express"
import { pool } from "../db.js"

export const getClientes = async (req, res) => {
    console.log("getClientes:", req.query)
    try {
        const { id_empresa } = req.query
        //console.log(limite, pagina)

        const rows = await pool.query(`CALL getClientes(?);`, [id_empresa])

        res.status(200).json({
            success: true,
            clientes: rows[0][0]
        })
    } catch (error) {
        res.status(500).json({
            error: "An error ocurred"
        })
    }
}


export async function apiObtenerCategorias (req, res) {
    const data = [
        {
            id: 1,
            descripcion: "Cillum ullamco dolore commodo velit ut anim enim consectetur cillum ex."
        },
        {
            id: 2,
            descripcion: "Cillum ullamco dolore commodo velit ut anim enim consectetur cillum ex."
        },
        {
            id: 3,
            descripcion: "Cillum ullamco dolore commodo velit ut anim enim consectetur cillum ex."
        },
        {
            id: 4,
            descripcion: "Cillum ullamco dolore commodo velit ut anim enim consectetur cillum ex."
        },
        {
            id: 5,
            descripcion: "Cillum ullamco dolore commodo velit ut anim enim consectetur cillum ex."
        }
    ]
    await res.send(data)
}

export async function apiObtenerProductos (req, res) {
    const data = [
        {
            id: 1,
            sku: "AB-1",
            nombre: "Producto 1",
            descripcion: "Cillum ullamco dolore commodo velit ut anim enim consectetur cillum ex.",
            pict1: "https://fiestatijuana.mx/image-not-available.png",
            precio: 10.0,
            descuento: 0.0,
            oferta: 0.0,
            existencia: 5,
            categoria: 1
        },
        {
            id: 2,
            sku: "AB-2",
            nombre: "Producto 2",
            descripcion: "Cillum ullamco dolore commodo velit ut anim enim consectetur cillum ex.",
            pict1: "https://fiestatijuana.mx/image-not-available.png",
            precio: 13.0,
            descuento: 0.0,
            oferta: 0.0,
            existencia: 5,
            categoria: 1
        },
        {
            id: 3,
            sku: "AB-3",
            nombre: "Producto 3",
            descripcion: "Cillum ullamco dolore commodo velit ut anim enim consectetur cillum ex.",
            pict1: "https://fiestatijuana.mx/image-not-available.png",
            precio: 20.0,
            descuento: 0.0,
            oferta: 0.0,
            existencia: 5,
            categoria: 1
        },
        {
            id: 4,
            sku: "AB-4",
            nombre: "Producto 4",
            descripcion: "Cillum ullamco dolore commodo velit ut anim enim consectetur cillum ex.",
            pict1: "https://fiestatijuana.mx/image-not-available.png",
            precio: 25.0,
            descuento: 0.0,
            oferta: 0.0,
            existencia: 5,
            categoria: 2
        },
        {
            id: 5,
            sku: "AB-5",
            nombre: "Producto 5",
            descripcion: "Cillum ullamco dolore commodo velit ut anim enim consectetur cillum ex.",
            pict1: "https://fiestatijuana.mx/image-not-available.png",
            precio: 30.0,
            descuento: 0.0,
            oferta: 0.0,
            existencia: 5,
            categoria: 3
        },
        {
            id: 6,
            sku: "AB-6",
            nombre: "Producto 6",
            descripcion: "Cillum ullamco dolore commodo velit ut anim enim consectetur cillum ex.",
            pict1: "https://fiestatijuana.mx/image-not-available.png",
            precio: 30.0,
            descuento: 0.0,
            oferta: 0.0,
            existencia: 5,
            categoria: 4
        }, 
        {
            id: 7,
            sku: "AB-7",
            nombre: "Producto 7",
            descripcion: "Cillum ullamco dolore commodo velit ut anim enim consectetur cillum ex.",
            pict1: "https://fiestatijuana.mx/image-not-available.png",
            precio: 30.0,
            descuento: 0.0,
            oferta: 0.0,
            existencia: 6,
            categoria: 5
        },                  
    ]
    await res.send(data)
}

//Obtener frases de DB
// export const getwhatsappFrases = async (req, res) => {
//     //console.log("getwhatsappFrases:", req.query)
//     try {
//         const { frase } = req.query
//         //console.log(limite, pagina)

//         const rows = await pool.query(`CALL getwhatsappFrases(?);`, [frase])
//         //console.log('rows: ', rows)
//         res.status(200).json({
//             success: true,
//             frase: rows[0][0]
//         })
//     } catch (error) {
//         res.status(500).json({
//             error: `An error ocurred: ${error}`
//         })
//     }
// }
//Ejecuto la función para obtener los datos
// export async function usarDatos(frase) {
//     //console.log('frase: ', frase)
//     const req = {
//         query: {
//         frase: frase 
//         }
//     }; // Objeto de petición vacío
//     const res = {
//         json: (data) => { console.log(data) },
//         status: (code) => { 
//             return { 
//                 json: (data) => { console.log(data) } 
//             }
//         }
//     };
//     return await getwhatsappFrases(req, res)
// }

// Ejecutar la función para obtener los datos (MODIFICADA)
export async function usarDatos(frase) {
    try {
        const resultado = await getwhatsappFrases(frase); // Llama a la función modificada
        //console.log("Resultado en usarDatos:", resultado); // Imprime el resultado para verificar
        return resultado // Retorna el resultado
    } catch (error) {
        console.error("Error en usarDatos:", error);
        return { // Manejo de errores en usarDatos
            success: false,
            error: `An error occurred: ${error}`
        };
    }
}

// Obtener frases de DB (MODIFICADA)
export const getwhatsappFrases = async (frase) => { // Ahora recibe solo 'frase'
    try {
        const rows = await pool.query(`CALL getwhatsappFrases(?);`, [frase]);
        return { // Retorna directamente el objeto con la frase
            success: true,
            frase: rows[0][0]
        };
    } catch (error) {
        console.error("Error en getwhatsappFrases:", error); // Loguea el error para depuración
        return { // Retorna un objeto de error
            success: false,
            error: `An error occurred: ${error}`
        };
    }
};