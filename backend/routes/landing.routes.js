import { Router } from "express"
import { getCategorias, getLandingPage, getProductosByCategoria, getPuntosDeEntrega } from "../controllers/landingController.js"

const router = Router()

router.get("/getCategorias", getCategorias)
router.get("/getLandingPage", getLandingPage)
router.get("/getProductosByCategoria", getProductosByCategoria)
router.get("/getPuntosDeEntrega", getPuntosDeEntrega)

export default router
