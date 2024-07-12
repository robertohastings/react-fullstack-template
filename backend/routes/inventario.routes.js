import { Router } from "express"
import { getCategoriasListado, putCategoria } from "../controllers/inventario.controller.js"

const router = Router()

router.get("/getCategoriasListado", getCategoriasListado)
router.get("/inventario/postCategoria", postCategoria)

export default router
