import { Router } from "express"
import { uploadImage } from "../controllers/uploadCloudinaryController.js"

const router = Router()

router.post("/upload/postCloudinary", uploadImage)

export default router
