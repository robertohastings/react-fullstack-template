
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from "url"
import { convertirFecha } from "../helpers/fecha.js"

export function appendToJsonLog(dataReceived, displayPhoneNumber) {

    var newJsonData = crearNuevoJson(dataReceived)

    const __filename = fileURLToPath(import.meta.url)
    const __dirname = path.dirname(__filename)

    //const logFilePath = 'log.json';
    // Ruta al archivo de log
    const logFilePath = path.join(__dirname, "../", 'logs', `${displayPhoneNumber}_whatsapp.js`); 

    // Leer el archivo existente (si existe)
    fs.readFile(logFilePath, 'utf8', (err, data) => {
        let logData = [];
        if (err) {
            if (err.code !== 'ENOENT') {
                console.error('Error al leer el archivo de log:', err);
                return;
            }
        }/* else {
        
            try {
            logData = JSON.parse(data);
            

            } catch (error) {
                console.error('Error al parsear el archivo de log:', error);
            }
        }
        */
        if (data) {
            logData = JSON.parse(data)
        } 
        
        // Agregar el nuevo registro
        logData.push(newJsonData);

        // Ordenar los registros por fecha (suponiendo que data.fecha existe)
        logData.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

        // Escribir el archivo
        fs.writeFile(logFilePath, JSON.stringify(logData, null, 2), (err) => {
            if (err) {
                console.error('Error al escribir en el archivo de log:', err);
            }
        });
    });
}

function crearNuevoJson(data) {
    const nuevoJson = {
      timestamp: convertirFecha(new Date().toISOString()) ,
      data: JSON.parse(data)
    };
    return nuevoJson;
  }
