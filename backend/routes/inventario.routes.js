import { Router } from "express"
import { getCategoriasListado, postCategoria } from "../controllers/inventario.controller.js"

const router = Router()

router.get("/getCategoriasListado", getCategoriasListado)
router.get("/inventario/postCategoria", postCategoria)

export default router
