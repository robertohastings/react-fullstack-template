import { Router } from "express"
import { uploadImage, getGaleria } from "../controllers/uploadCloudinaryController.js"

const router = Router()

router.post("/upload/postCloudinary", uploadImage)
router.get("/galeria/getGaleria", getGaleria)

export default router
