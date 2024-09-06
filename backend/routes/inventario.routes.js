import { Router } from "express"
import { getCategoriasListado, postCategoria, getProductosListado, 
        postProducto, postVisita, getVisitasByIdUsuario } from "../controllers/inventario.controller.js"

const router = Router()
//Categorias
router.get("/getCategoriasListado", getCategoriasListado)
router.post("/inventario/postCategoria", postCategoria)
//Productos
router.get("/inventario/getProductosListado", getProductosListado)
router.post("/inventario/postProducto", postProducto)
//Visitas
router.post("/geolocator/postVisita", postVisita)
router.get("/geolocator/getVisitasByIdUsuario", getVisitasByIdUsuario)

export default router
