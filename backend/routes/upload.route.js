import { Router } from "express"
import { uploadImageToCloudinary } from "../controllers/uploadCloudinaryController.js"

const router = Router()

router.post("/upload/postCloudinary", uploadImageToCloudinary)

export default router
