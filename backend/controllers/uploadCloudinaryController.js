// import dotenv from "dotenv"
// import { v2 as cloudinary } from "cloudinary"
import multer from "multer"
import path from "path"

// Middleware para asegurar que los campos del formulario estén disponibles
const uploadMiddleware = multer().none();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "images/categorias") // Carpeta de destino para las imágenes
    },
    filename: (req, file, cb) => {
        const id_categoria = req.body.id_categoria
        const id_empresa = req.body.id_empresa
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9)
        cb(null, `${id_empresa}_${id_categoria}_${uniqueSuffix}-${file.originalname}.jpg`)
    }
})

const upload = multer({ storage: storage }).single("image")

// dotenv.config()
// cloudinary.config({
//     cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//     api_key: process.env.CLOUDINARY_API_KEY,
//     api_secret: process.env.CLOUDINARY_API_SECRET
// })

export const uploadImageToCloudinary = (req, res) => {
    console.log("entre uploadImageToCloudinary")

    //Subo el archivo localmente al servidor
    uploadMiddleware(req, res, (err) => {
        if (err) {
            //console.log("error", err)
            return res.status(500).json({ message: "Error uploading image", error: err.message })
        }

        upload(req, res, (err) => {

            if (err) {
                return res.status(500).json({ message: 'Error uploading image', error: err.message });
            }    

            if (!req.file) {
                return res.status(400).json({ message: "No image file uploaded" })
            }
    
            console.log("imágen de categoria:", req.body.id_categoria, " empresa:", req.body.id_empresa)
            res.status(200).json({ message: "Image uploaded successfully", file: req.file })
        })
    }

    //

    // try {
    //     var image = req.files.image

    //     const response = await cloudinary.uploader
    //         .upload(image, {
    //             timeout: 150000,
    //             folder: "nir",
    //             public_id: `${Date.now()}`,
    //             resource_type: "auto"
    //         })
    //         .then(result => {
    //             console.log(result)
    //             res.status(200).json({
    //                 message: "Imagen cargada en cloudinary",
    //                 url: result.secure_url
    //             })
    //         })
    //         .catch(error => {
    //             console.log("Ocurrió el error al subir la imágen;", error)
    //         })
    // } catch (error) {
    //     console.log("Ocurrió el error al subir la imágen;", error)
    //     res.status(500).json({
    //         message: `Ocurrió un eror en el servidor: ${error}`
    //     })
    // }
)}
