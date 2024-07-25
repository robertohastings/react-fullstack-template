// import dotenv from "dotenv"
import { v2 as cloudinary } from "cloudinary"
import { pool } from "../db.js"

//import multer from "multer"
import path from "path"
import { fileURLToPath } from "url"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
//console.log("dirname:", __dirname)

// Middleware para asegurar que los campos del formulario estén disponibles
// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//       cb(null, 'imagenes/categorias'); // Carpeta de destino para las imágenes
//     },
//     filename: (req, file, cb) => {
//       const idCategoria = req.body.id_categoria || 'undefined';
//       const idEmpresa = req.body.id_empresa || 'undefined';
//       const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
//       cb(null, `${idCategoria}-${idEmpresa}-${uniqueSuffix}.jpg`);
//     }
//   });

//   const upload = multer({ storage: storage });

// dotenv.config()
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

export const uploadImage = (req, res) => {
    //console.log("entre al controlador")
    let sampleFile
    let uploadPath

    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send("No files were uploaded.")
    }

    // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
    sampleFile = req.files.image
    let reqPath = path.join(__dirname, "../", "imagenes/categorias", `${req.body.id_empresa}_cat_${req.body.id_categoria}.jpg`)
    uploadPath = reqPath

    // Use the mv() method to place the file somewhere on your server
    sampleFile.mv(uploadPath, async function (err) {
        if (err) {
            console.log(err.message)
            return res.status(500).send(err)
        }

        //res.send("File uploaded!")
        //res.status(200).json({ message: "Image uploaded successfully", file: req.files.image })

        try {
            var image = reqPath
            console.log("image to upload to cloudinary", image)

            const response = await cloudinary.uploader
                .upload(image, {
                    timeout: 150000,
                    folder: "nir",
                    public_id: `${req.body.id_empresa}_cat_${req.body.id_categoria}`,
                    resource_type: "image",
                    format: "jpg"
                })
                .then(async result => {
                    console.log(result)

                    //Actualizo la imagen en la db
                    try {
                        const rows = await pool.query(`CALL putCategoriaImage(?, ?, ?);`, 
                            [req.body.id_categoria, req.body.id_empresa, result.secure_url])                        
                    } catch (error) {
                        console.log('error al actualizar la imagen en la db', error)
                    }

                    res.status(200).json({
                        message: "Imagen cargada en cloudinary",
                        url: result.secure_url
                    })


                })
                .catch(error => {
                    console.log("Ocurrió el error al subir la imágen a cloudinary", error)
                    return res.status(400).json({ message: "Ocurrió el error al subir la imágen a cloudinary" })
                })
        } catch (error) {
            console.log("Ocurrió el error al subir la imágen;", error)
            res.status(500).json({
                message: `Ocurrió un eror en el servidor al subir imagen a cloudinary: ${error}`
            })
        }
    })

    // upload.single('image')(req, res, (err) => {
    //     console.log(req.body)
    //   if (err) {
    //     console.log(err.message)
    //     return res.status(500).json({ message: 'Error uploading image', error: err.message });
    //   }
    //   if (!req.file) {
    //     return res.status(400).json({ message: 'No image file uploaded' });
    //   }
    //   res.status(200).json({ message: 'Image uploaded successfully', file: req.file.filename });
    // });
}

// export const uploadImageToCloudinary = (req, res) => {
//     console.log("entre uploadImageToCloudinary")

//     //Subo el archivo localmente al servidor
//     uploadMiddleware(req, res, (err) => {
//         if (err) {
//             console.log("error", err)
//             return res.status(500).json({ message: "Error uploading image", error: err.message })
//         }

//         upload(req, res, (err) => {

//             if (err) {
//                 return res.status(500).json({ message: 'Error uploading image', error: err.message });
//             }

//             if (!req.file) {
//                 return res.status(400).json({ message: "No image file uploaded" })
//             }

//             console.log("imágen de categoria:", req.body.id_categoria, " empresa:", req.body.id_empresa)
//             res.status(200).json({ message: "Image uploaded successfully", file: req.file })
//         })
//     }

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
//)}
