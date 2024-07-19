import dotenv from "dotenv"
import { v2 } from "cloudinary"

dotenv.config()
v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

export const uploadImageToCloudinary = async (req, res) => {
    console.log("entre uploadImageToCloudinary")
    try {
        var image = req.body.image

        const response = await v2.uploader.upload(image, {
            upload_preset: "nir"
        })
        console.log(response)
        res.status(200).json({
            message: "Imagen cargada en cloudinary"
        })
    } catch (error) {
        console.log("Ocurrió el error al subir la imágen;", error)
        res.status(500).json({
            message: `Ocurrió un eror en el servidor: ${error}`
        })
    }
}
