import { Router } from "express"
import { authenticateToken } from "../middlewares/authenticateToken.js"
import { getProveedoresListado, postProveedor } from "../controllers/comprasController.js"

const router = Router()

//Proveedores
router.get("/compras/getProveedoresListado", getProveedoresListado)
router.post("/compras/postProveedor", postProveedor)

export default router
