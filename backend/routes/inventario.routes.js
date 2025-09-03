import { Router } from "express"
import { authenticateToken } from "../middlewares/authenticateToken.js"
import { getCategoriasListado, postCategoria, getProductosListado, 
        postProducto, postVisita, getVisitasByIdUsuario,
        getJornadaLaboral, postJornadaLaboral, postGeoLocalizacion,
        getProductosCombo, getKardex, 
        getOrdenCompraEstatus, postOrdenDeCompra, getOrdenDeCompra, putOrdenDeCompra, putOrdenDeCompraRecibo, deleteOrdenDeCompra,
        getProveedoresFiltro, getProductosByProveedor } from "../controllers/inventario.controller.js"

const router = Router()
//Categorias
router.get("/getCategoriasListado", authenticateToken, getCategoriasListado)
router.post("/inventario/postCategoria", authenticateToken, postCategoria)
//Productos
router.get("/inventario/getProductosListado", authenticateToken, getProductosListado)
router.get("/inventario/getProductosByProveedor", authenticateToken, getProductosByProveedor)
router.post("/inventario/postProducto", authenticateToken, postProducto)
//Visitas
router.post("/geolocator/postVisita", postVisita)
router.get("/geolocator/getVisitasByIdUsuario", getVisitasByIdUsuario)
//Jornada Laboral
router.get("/geolocator/getJornadaLaboral", getJornadaLaboral)
router.post("/geolocator/postJornadaLaboral", postJornadaLaboral)
//Localizacion
router.post("/geolocator/postGeoLocalizacion", postGeoLocalizacion)
//Combos
router.get("/getProductosCombo", getProductosCombo)
//Kardex
router.get("/getKardex", authenticateToken, getKardex)
//Orden de Compra estados
router.get("/getOrdenDeCompra", authenticateToken, getOrdenDeCompra)
router.get("/getOrdenCompraEstatus", authenticateToken, getOrdenCompraEstatus)
router.post("/postOrdenDeCompra", authenticateToken, postOrdenDeCompra)
router.put('/putOrdenDeCompra', authenticateToken, putOrdenDeCompra);
router.put('/putOrdenDeCompraRecibo', authenticateToken, putOrdenDeCompraRecibo);
router.put('/deleteOrdenDeCompra', authenticateToken, deleteOrdenDeCompra);
//Proveedoeres
router.get("/getProveedoresFiltro", authenticateToken, getProveedoresFiltro)
export default router