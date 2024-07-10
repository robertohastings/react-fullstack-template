import { Router } from "express"
import { putLandingPage, putLandingPage_QuienesSomos, putLandingPage_Productos, putLandingPage_Servicios, putLandingPage_Settings } from "../controllers/admin_controller.js"

const router = Router()

router.get("putLandingPage", putLandingPage)
router.put("/putLandingPage_QuienesSomos", putLandingPage_QuienesSomos)
router.put("/putLandingPage_Productos", putLandingPage_Productos)
router.put("/putLandingPage_Servicios", putLandingPage_Servicios)
router.put("/putLandingPage_Settings", putLandingPage_Settings)

export default router
