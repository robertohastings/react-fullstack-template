import { Router } from "express"
import { getCategorias, getLandingPage, getProductosByCategoria, getPuntosDeEntrega, getColoniasDeliveryListing, postColoniaDelivery,
    getCajeroListing, postCajero
} from "../controllers/landingController.js"

const router = Router()

router.get("/getCategorias", getCategorias)
router.get("/getLandingPage", getLandingPage)
router.get("/getProductosByCategoria", getProductosByCategoria)
router.get("/getPuntosDeEntrega", getPuntosDeEntrega)
router.get("/getColoniasDeliveryListing", getColoniasDeliveryListing)
router.post("/postColoniaDelivery", postColoniaDelivery)
router.get("/getCajeroListing", getCajeroListing)
router.post("/postCajero", postCajero)

export default router
