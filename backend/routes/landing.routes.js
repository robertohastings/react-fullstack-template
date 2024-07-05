import { Router } from "express"
import { getCategorias } from "../controllers/landingController.js"

const router = Router()

router.get("/getCategorias", getCategorias)

export default router
