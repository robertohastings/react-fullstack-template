import { Router } from "express"
import { getClientes, getwhatsappFrases } from "../controllers/catalagosController.js"

const router = Router()

//Clientes
router.get("/catalogos/getClientes", getClientes)
router.get("/catalogos/getwhatsappFrases", getwhatsappFrases)

export default router