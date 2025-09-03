import { GoogleGenerativeAI } from "@google/generative-ai";
import { config } from "dotenv";

const API_KEY = process.env.GOOGLE_API_KEY;

config()

if (!API_KEY && typeof __app_id === 'undefined') {
  console.warn('La clave API de GOOGLE_API_KEY no está definida. Asegúrate de configurarla en tu archivo .env o en el entorno de Canvas.');
}

// Inicializa el cliente de la API de Google Gemini
const genAI = new GoogleGenerativeAI(API_KEY);

/**
 * Función para generar una imagen utilizando el modelo de IA.
 * Utiliza el modelo 'imagen-3.0-generate-002' para la generación de imágenes.
 */
export const generateImage = async (req, res) => {
  const { prompt } = req.body;

  if (!prompt) {
    return res.status(400).json({ error: 'El campo "prompt" es requerido para generar la imagen.' });
  }

  try {
    // Usamos el modelo imagen-3.0-generate-002 para la generación de imágenes.
    // Este modelo utiliza el método predict para la generación de imágenes.
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/imagen-3.0-generate-002:predict?key=${API_KEY}`;
    const payload = {
      instances: { prompt: prompt },
      parameters: { "sampleCount": 1 }
    };

    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
        const errorData = await response.json();
        console.error('Error al llamar a la API de Imagen:', errorData);
        return res.status(response.status).json({ error: 'Error al generar la imagen desde la IA.', details: errorData });
    }

    const result = await response.json();

    // Extrae la imagen en base64
    const base64Data = result?.predictions?.[0]?.bytesBase64Encoded;

    if (!base64Data) {
      console.error('No se recibió la imagen en base64 de la IA.');
      return res.status(500).json({ error: 'No se pudo generar la imagen o la respuesta fue inesperada.' });
    }

    // Devuelve la imagen como una URL de datos base64 para que el frontend la muestre
    const imageUrl = `data:image/png;base64,${base64Data}`;
    res.json({ imageUrl });

  } catch (error) {
    console.error('Error en generateImage:', error);
    res.status(500).json({ error: 'Ocurrió un error al procesar la solicitud de imagen.', details: error.message });
  }
};


/**
 * Función para generar contenido de texto utilizando el modelo de IA.
 * Utiliza el modelo 'gemini-2.5-flash-preview-05-20' para la generación de texto.
 */
export const generateContent = async (req, res) => {
    console.log('API KEY', API_KEY)
    console.log('body:', req.body)
  const { prompt, context } = req.body;

  if (!prompt) {
    return res.status(400).json({ error: 'El campo "prompt" es requerido para generar contenido.' });
  }

  try {
    // Selecciona el modelo específico para generación de texto
    const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash-preview-05-20' });

    // Prepara la historia de chat con un prompt inicial para guiar la IA
    let chatHistory = [];
    if (context) {
      chatHistory.push({ role: 'user', parts: [{ text: `Basado en el siguiente contexto: "${context}", genera contenido sobre: ${prompt}` }] });
    } else {
      chatHistory.push({ role: 'user', parts: [{ text: prompt }] });
    }

    // Configuración del payload para la API de Gemini
    const payload = { contents: chatHistory };
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=${API_KEY}`;

    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
        const errorData = await response.json();
        console.error('Error al llamar a la API de Gemini para texto:', errorData);
        return res.status(response.status).json({ error: 'Error al generar el contenido desde la IA.', details: errorData });
    }

    const result = await response.json();
    const generatedText = result?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!generatedText) {
      console.error('No se recibió texto generado de la IA.');
      return res.status(500).json({ error: 'No se pudo generar el contenido o la respuesta fue inesperada.' });
    }

    res.json({ content: generatedText });

  } catch (error) {
    console.error('Error en generateContent:', error);
    res.status(500).json({ error: 'Ocurrió un error al procesar la solicitud de contenido.', details: error.message });
  }
};