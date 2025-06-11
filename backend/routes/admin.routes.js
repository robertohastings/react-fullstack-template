import { Router } from "express"
import { authenticateToken } from "../middlewares/authenticateToken.js"
import { putLandingPage, putLandingPage_QuienesSomos, putLandingPage_Productos, 
        putLandingPage_Servicios, putLandingPage_Settings, postPuntosDeEntrega, 
        putUsuario, getUsuario, postDireccion, getDirecciones, getPuntosDeEntregaCarrito, 
        getFormasDePago, putFormasDePago, postPedido, getPedidoDetalle, getPedidoCanvas, 
        putPedidoEstatus, getTipoPedido, getColoniasDelivery, getCajeros, getCaja, getIP, getIPLocal} from "../controllers/admin_controller.js"

const router = Router()

router.get("putLandingPage", putLandingPage)
router.put("/putLandingPage_QuienesSomos", putLandingPage_QuienesSomos)
router.put("/putLandingPage_Productos", putLandingPage_Productos)
router.put("/putLandingPage_Servicios", putLandingPage_Servicios)
router.put("/putLandingPage_Settings", putLandingPage_Settings)
router.post("/postPuntosDeEntrega", postPuntosDeEntrega)
router.put("/putUsuario", putUsuario)
router.get("/getUsuario", getUsuario)
router.post("/postDireccion", postDireccion)
router.get("/getDirecciones", getDirecciones)
router.get("/getPuntosDeEntregaCarrito", getPuntosDeEntregaCarrito)
router.get("/getFormasDePago", getFormasDePago)
router.put("/putFormasDePago", putFormasDePago)
router.get("/getPedidoDetalle", getPedidoDetalle)
router.get("/getPedidoCanvas", getPedidoCanvas)
router.put("/putPedidoEstatus", putPedidoEstatus)
router.post("/postPedido", postPedido)
router.get("/getTipoPedido", getTipoPedido)
router.get("/getColoniasDelivery", getColoniasDelivery)
router.get("/getCajeros", getCajeros)
router.get("/getCaja", getCaja)
router.get("/getIP", getIP)
router.get("/getIPLocal", getIPLocal)
export default router

