import dotenv from "dotenv"
import { v2 as cloudinary } from "cloudinary"

dotenv.config()
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

export const uploadImageToCloudinary = async (req, res) => {
    console.log("entre uploadImageToCloudinary")
    try {
        var image = req.body.image

        const response = await cloudinary.uploader
            .upload(image, {
                timeout: 150000,
                folder: "nir"
            })
            .then(result => {
                console.log(result)
                res.status(200).json({
                    message: "Imagen cargada en cloudinary",
                    url: result.secure_url
                })
            })
            .catch(error => {
                console.log("Ocurrió el error al subir la imágen;", error)
            })
    } catch (error) {
        console.log("Ocurrió el error al subir la imágen;", error)
        res.status(500).json({
            message: `Ocurrió un eror en el servidor: ${error}`
        })
    }
}
