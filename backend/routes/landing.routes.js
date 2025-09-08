import { Router } from "express"
import { getCategorias, getLandingPage, getProductosByCategoria, getPuntosDeEntrega, getColoniasDeliveryListing, postColoniaDelivery,
    getCajeroListing, postCajero, postPuntoDeEntrega
} from "../controllers/landingController.js"

const router = Router()

router.get("/getCategorias", getCategorias)
router.get("/getLandingPage", getLandingPage)
router.get("/getProductosByCategoria", getProductosByCategoria)
router.get("/getPuntosDeEntrega", getPuntosDeEntrega)
router.post("/postPuntoDeEntrega", postPuntoDeEntrega)
router.get("/getColoniasDeliveryListing", getColoniasDeliveryListing)
router.post("/postColoniaDelivery", postColoniaDelivery)
router.get("/getCajeroListing", getCajeroListing)
router.post("/postCajero", postCajero)

export default router
