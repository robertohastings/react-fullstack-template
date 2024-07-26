import { Router } from "express"
import { getCategoriasListado, postCategoria, getProductosListado, postProducto } from "../controllers/inventario.controller.js"

const router = Router()
//Categorias
router.get("/getCategoriasListado", getCategoriasListado)
router.post("/inventario/postCategoria", postCategoria)
//Productos
router.get("/inventario/getProductosListado", getProductosListado)
router.post("/inventario/postCategoria", postCategoria)

export default router
