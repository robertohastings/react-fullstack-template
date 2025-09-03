import { Router } from "express"
import { authenticateToken } from "../middlewares/authenticateToken.js"
import { generateImage, generateContent } from "../controllers/ai.controller.js";

const router = Router()

// Ruta para generar imágenes
// Espera un POST con un cuerpo { prompt: "descripción de la imagen" }
router.post('/generate-image', generateImage);

// Ruta para generar contenido de texto
// Espera un POST con un cuerpo { prompt: "instrucciones para el contenido", context: "quienes somos" }
//router.post('/generate-content', authenticateToken, generateContent);
router.post('/generateContent', generateContent);

export default router
