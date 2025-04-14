import { Router } from "express"
import { authenticateToken } from "../middlewares/authenticateToken.js"
import { getProveedoresListado, postProveedor } from "../controllers/comprasController.js"

const router = Router()

//Proveedores
router.get("/compras/getProveedoresListado", authenticateToken, getProveedoresListado)
router.post("/compras/postProveedor", authenticateToken, postProveedor)

export default router
