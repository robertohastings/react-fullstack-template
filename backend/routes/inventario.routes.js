import { Router } from "express"
import { getCategoriasListado } from "../controllers/inventario.controller.js"

const router = Router()

router.get("/getCategoriasListado", getCategoriasListado)

export default router
