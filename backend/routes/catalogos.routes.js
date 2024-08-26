import { Router } from "express"
import { getClientes } from "../controllers/catalagosController.js"

const router = Router()

//Clientes
router.get("/catalogos/getClientes", getClientes)

export default router