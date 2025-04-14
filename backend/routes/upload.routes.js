import { Router } from "express"
import { authenticateToken } from "../middlewares/authenticateToken.js"
import { uploadImage, getGaleria } from "../controllers/uploadCloudinaryController.js"

const router = Router()

router.post("/upload/postCloudinary", authenticateToken, uploadImage)
router.get("/galeria/getGaleria", getGaleria)

export default router
