import { Router } from "express"
import { getCategorias, getLandingPage, getProductosByCategoria } from "../controllers/landingController.js"


const router = Router()

router.get("/getCategorias", getCategorias)
router.get("/getLandingPage", getLandingPage)
router.get("/getProductosByCategoria", getProductosByCategoria)

export default router
