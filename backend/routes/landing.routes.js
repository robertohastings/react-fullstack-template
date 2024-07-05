import { Router } from "express"
import { getCategoriasByPage } from "../controllers/landingController.js"

const router = Router()

router.get("/getCategoriasByPage", getCategoriasByPage)

export default router
