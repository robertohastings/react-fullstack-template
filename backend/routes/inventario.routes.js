import { Router } from "express"
import { authenticateToken } from "../middlewares/authenticateToken.js"
import { getCategoriasListado, postCategoria, getProductosListado, 
        postProducto, postVisita, getVisitasByIdUsuario,
        getJornadaLaboral, postJornadaLaboral, postGeoLocalizacion } from "../controllers/inventario.controller.js"

const router = Router()
//Categorias
router.get("/getCategoriasListado", authenticateToken, getCategoriasListado)
router.post("/inventario/postCategoria", postCategoria)
//Productos
router.get("/inventario/getProductosListado", authenticateToken, getProductosListado)
router.post("/inventario/postProducto", authenticateToken, postProducto)
//Visitas
router.post("/geolocator/postVisita", postVisita)
router.get("/geolocator/getVisitasByIdUsuario", getVisitasByIdUsuario)
//Jornada Laboral
router.get("/geolocator/getJornadaLaboral", getJornadaLaboral)
router.post("/geolocator/postJornadaLaboral", postJornadaLaboral)
//Localizacion
router.post("/geolocator/postGeoLocalizacion", postGeoLocalizacion)
export default router
