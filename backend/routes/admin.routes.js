import { Router } from "express"
import { authenticateToken } from "../middlewares/authenticateToken.js"
import { putLandingPage, putLandingPage_QuienesSomos, putLandingPage_Productos, 
        getLandingPageAdmin, putLandingPage_Servicios, putLandingPage_Settings, postPuntosDeEntrega, 
        putUsuario, getUsuario, postDireccion, getDirecciones, getPuntosDeEntregaCarrito, 
        getFormasDePago, putFormasDePago, postPedido, getPedidoDetalle, getPedidoCanvas, 
        putPedidoEstatus, getTipoPedido, getColoniasDelivery, getCajeros, getCaja, getIP, getIPLocal,
        postCajaAbrir, postCajaMovimientos, postCajaCerrar, getMovimientosDeCaja, getPedidosPorIdCaja,
        getMenu, postMenu, getRolListing, postRol, getModuloListing, postModulo,
        getRolMenuListing, postRolMenu, getRoles,
        getEmpresasListing, postEmpresa
} from "../controllers/admin_controller.js"

const router = Router()

router.get("/getLandingPageAdmin", authenticateToken, getLandingPageAdmin)
router.get("/putLandingPage", authenticateToken, putLandingPage)
router.put("/putLandingPage_QuienesSomos", putLandingPage_QuienesSomos)
router.put("/putLandingPage_Productos", putLandingPage_Productos)
router.put("/putLandingPage_Servicios", putLandingPage_Servicios)
router.put("/putLandingPage_Settings", putLandingPage_Settings)
router.post("/postPuntosDeEntrega", postPuntosDeEntrega)
router.put("/putUsuario", authenticateToken, putUsuario)
router.get("/getUsuario", authenticateToken, getUsuario)
router.post("/postDireccion", postDireccion)
router.get("/getDirecciones", authenticateToken, getDirecciones)
router.get("/getPuntosDeEntregaCarrito", getPuntosDeEntregaCarrito)
router.get("/getFormasDePago", getFormasDePago)
router.put("/putFormasDePago", putFormasDePago)
router.get("/getPedidoDetalle", authenticateToken, getPedidoDetalle)
router.get("/getPedidoCanvas", getPedidoCanvas)
router.put("/putPedidoEstatus", putPedidoEstatus)
router.post("/postPedido", postPedido)
router.get("/getTipoPedido", getTipoPedido)
router.get("/getColoniasDelivery", getColoniasDelivery)
router.get("/getCajeros", getCajeros)
router.get("/getCaja", getCaja)
router.get("/getIP", getIP)
router.get("/getIPLocal", getIPLocal)
router.post("/postCajaAbrir", postCajaAbrir)
router.post("/postCajaMovimientos", postCajaMovimientos)
router.post("/postCajaCerrar", postCajaCerrar)
router.get("/getMovimientosDeCaja", getMovimientosDeCaja)
router.get("/getPedidosPorIdCaja", getPedidosPorIdCaja)
router.get("/getMenu", getMenu)
router.post("/postMenu", postMenu)
router.get("/getRolListing", getRolListing)
router.post("/postRol", postRol)
router.get("/getModuloListing", getModuloListing)
router.post("/postModulo", postModulo)
router.get("/admin/getRolMenuListing", getRolMenuListing)
router.post("/admin/postRolMenu", postRolMenu)
router.get("/admin/getRoles", getRoles)
router.get("/admin/getEmpresasListing", getEmpresasListing)
router.post("/admin/postEmpresa", postEmpresa)

export default router

