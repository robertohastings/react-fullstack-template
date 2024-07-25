import { Router } from "express"
import { getCategoriasListado, postCategoria } from "../controllers/inventario.controller.js"

const router = Router()
//Categorias
router.get("/getCategoriasListado", getCategoriasListado)
router.post("/inventario/postCategoria", postCategoria)

export default router
