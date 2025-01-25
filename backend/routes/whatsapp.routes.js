import { Router } from "express"
import { VerifyToken, ReceivedMessage } from "../controllers/whatsappController.js"

const router = Router()

router.get("/verifyToken", VerifyToken)
router.post("/receivedMessage", ReceivedMessage)

export default router