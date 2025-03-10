import { Router } from "express"
import { putLandingPage, putLandingPage_QuienesSomos, putLandingPage_Productos, 
        putLandingPage_Servicios, putLandingPage_Settings, postPuntosDeEntrega, 
        putUsuario, getUsuario, postDireccion, getDirecciones, getPuntosDeEntregaCarrito, 
        getFormasDePago, putFormasDePago, postPedido, getPedidoDetalle, getPedidoCanvas, 
        putPedidoEstatus, getAgendaPorDia, getClientePorTelefonoOCelular, 
        postAgenda, putAgenda, putAgendaConfirmar, putAgendaCancelar, putAgendaCambiaEstatus } from "../controllers/admin_controller.js"

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
router.post("/postPedido", postPedido)
router.get("/getPedidoDetalle", getPedidoDetalle)
router.get("/getPedidoCanvas", getPedidoCanvas)
router.put("/putPedidoEstatus", putPedidoEstatus)
router.get("/getAgendaPorDia", getAgendaPorDia)
router.get("/getClientePorTelefonoOCelular", getClientePorTelefonoOCelular)
router.post("/postAgenda", postAgenda)
router.put("/putAgenda", putAgenda)
router.put("/putAgendaConfirmar", putAgendaConfirmar)
router.put("/putAgendaCancelar", putAgendaCancelar)
router.put("/putAgendaCambiaEstatus", putAgendaCambiaEstatus)

export default router
