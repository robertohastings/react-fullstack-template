import express from "express"
import cors from "cors"
//import fileUpload from "express-fileupload"

//routes
import route from "./router.js"
import usersRoutes from "./routes/user.routes.js"
import landingRoutes from "./routes/landing.routes.js"
import adminRoutes from "./routes/admin.routes.js"
import inventarioRoutes from "./routes/inventario.routes.js"
import uploadRoutes from "./routes/upload.routes.js"

const app = express()
//const PORT = process.env.PORT || 8080
import { PORT } from "./config.js"

//const PORT = 5000

// Para parsear el cuerpo de las solicitudes como JSON que esta incluido en express
//app.use(json())

//cuando es error 404 NotFound hay que revisar las rutas que estén bien escritas

app.use(cors())
app.use(express.json()) //Para pueda interpretar la recepción de JSON
//app.use(fileUpload())

app.use("/api", route)
app.use("/api", usersRoutes)
app.use("/api/", landingRoutes)
app.use("/api/", adminRoutes)
app.use("/api/", inventarioRoutes)
app.use("/api/", uploadRoutes)

app.get("/api", (req, res) => {
    res.send("Hola mundo from backend! 5")
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})

export default app
