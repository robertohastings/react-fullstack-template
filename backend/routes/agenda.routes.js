import { Router } from "express"
import { authenticateToken } from "../middlewares/authenticateToken.js"
import { getAgendaPorDia, getClientePorTelefonoOCelular, 
    postAgenda, putAgenda, putAgendaConfirmar, putAgendaCancelar, putAgendaCambiaEstatus } from "../controllers/agenda_controller.js"
    
const router = Router()

router.get("/getAgendaPorDia", authenticateToken, getAgendaPorDia)
router.get("/getClientePorTelefonoOCelular", authenticateToken, getClientePorTelefonoOCelular)
router.post("/postAgenda", postAgenda)
router.put("/putAgenda", putAgenda)
router.put("/putAgendaConfirmar", putAgendaConfirmar)
router.put("/putAgendaCancelar", putAgendaCancelar)
router.put("/putAgendaCambiaEstatus", putAgendaCambiaEstatus)

export default router