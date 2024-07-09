import { Router } from "express"
const apiRouter = Router()

import { apiLanding } from "./controllers/landingController.js"
import { apiObtenerCategorias, apiObtenerProductos } from "./controllers/catalagosController.js"

//import cors from "cors"

apiRouter.get("/router", (req, res) => res.json("Hello, if you see this message that means that backend routing is up and running successfully"))
//apiRouter.get("/holamundo", apiHolaMundo)
apiRouter.get("/landingPage", apiLanding)
//apiRouter.post("/send-email-by-gmail", apiSendEmailByGmal)
//catalagos
apiRouter.get("/catalagos/obtener-categorias", apiObtenerCategorias)
apiRouter.get("/inventario/obtener-productos", apiObtenerProductos)

export default apiRouter
