import express from "express"
import cors from "cors"
import fileUpload from "express-fileupload"

//routes
import route from "./router.js"
import usersRoutes from "./routes/user.routes.js"
import landingRoutes from "./routes/landing.routes.js"
import adminRoutes from "./routes/admin.routes.js"
import inventarioRoutes from "./routes/inventario.routes.js"
import uploadRoutes from "./routes/upload.routes.js"
import comprasRoutes from "./routes/compras.routes.js"
import catalogosRoutes from "./routes/catalogos.routes.js"
import whatsappRoutes from "./routes/whatsapp.routes.js"
import agendaRoutes from "./routes/agenda.routes.js"

const app = express()
//const PORT = process.env.PORT || 8080
import { PORT } from "./config.js"

//const PORT = 5000

// Para parsear el cuerpo de las solicitudes como JSON que esta incluido en express
//app.use(json())

//cuando es error 404 NotFound hay que revisar las rutas que estén bien escritas

//const allowedOrigins = ['http://localhost:3001', 'https://api.hostregio.app', 'https://herbolaria.hostregio.app']; // Ajusta según tus dominios permitidos

// app.use(cors({
//     origin: allowedOrigins,
//     methods: 'GET,POST,PUT,DELETE',
//     credentials: true
// }))

const allowedOrigins = ['http://localhost:3001', /\.hostregio\.app$/]; // Permite localhost y cualquier subdominio de hostregio.app

app.use(cors({
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.some((allowedOrigin) => {
            if (typeof allowedOrigin === 'string') {
                return origin === allowedOrigin;
            } else if (allowedOrigin instanceof RegExp) {
                return allowedOrigin.test(origin);
            }
            return false;
        })) {
            callback(null, true); // Permite el origen
        } else {
            callback(new Error('No permitido por CORS')); // Bloquea el origen
        }
    },
    methods: 'GET,POST,PUT,DELETE',
    credentials: true
}));

app.use(express.json()) //Para pueda interpretar la recepción de JSON
app.use(fileUpload())

app.use("/api", route)
app.use("/api", usersRoutes)
app.use("/api/", landingRoutes)
app.use("/api/", adminRoutes)
app.use("/api/", agendaRoutes)
app.use("/api/", inventarioRoutes)
app.use("/api/", uploadRoutes)
app.use("/api/", comprasRoutes)
app.use("/api/", catalogosRoutes)
app.use("/whatsapp", whatsappRoutes)

app.get("/api", (req, res) => {
    res.send("Hola mundo from backend! 5")
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})

export default app
