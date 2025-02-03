import { Router } from "express"
import { VerifyToken, ReceivedMessage } from "../controllers/whatsappController.js"

const router = Router()

router.get("/", VerifyToken)
router.post("/", ReceivedMessage)
//router.get("/", getwhatsappFrases)

export default router