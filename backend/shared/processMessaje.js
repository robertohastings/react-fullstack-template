import { MessageText, MessageList, MessageButton, MessageLocation } from '../shared/whatsappModels.js'
import { SendMessageWhatsApp } from '../services/whatsappService.js'
import { usarDatos  } from '../controllers/catalagosController.js'
import { text } from 'express';
//import { pool } from '../db.js';

export async function Process(textUser, number) {
    const mensajeNormalizado = normalizarMensaje(textUser);

    textUser = mensajeNormalizado
    console.log('texto normalizado:', textUser)

    //Busco el texto del usuario en la tabla whatsapp_frases
    //TODO: Implmentar la memoria chache
    //const resultado = await usarDatos(textUser)

    var models = []
    const funciones = {
        MessageText: MessageText
    }

    usarDatos(textUser).then(resultado => {
        //console.log("Resultado final usarDatos:", resultado.frase); // Imprime el resultado final
        const { respuesta, funcion } = resultado.frase[0]
        //const respuesta = resultado.respuesta
        //const funcion = resultado.funcion
        console.log('usarDatos respuesta:', respuesta, ' usarDatos funcion:', funcion)

        // Verifica que la función exista antes de llamarla
        if (typeof funciones[funcion] === 'function') { // <-- Importante verificación
            const mensaje = funciones[funcion](respuesta, number) // Llama a la función dinámicamente
            console.log("Mensaje de la función:", mensaje); // Aquí tienes el resultado de MessageText
            // ... (envía el mensaje por WhatsApp)
            
            models.push(mensaje)
        } else {
            //console.error("La función", funcion, "no existe.");
            var model = MessageText('No entiendo..', number)
            models.push(model)
        }   
    })
    .catch(error => {
        console.error("Error en la llamada:", error);
        var model = MessageText('No entiendo', number)
        models.push(model)
    });    

    //const resultado = await buscarRespuesta(mensajeNormalizado);
    //console.log(`respueta encontrada en db: ${resultado}`)

  /*

    if (textUser.includes('hola')) {
        //Saludar
        var model = MessageText('Hola, me da gusto saludarte. Ensseguida te muestro nuestro menú de opciones disponibles', number)
        models.push(model)

        //Lista
        var modelList = MessageList(number)
        models.push(modelList)
    } else if(textUser.includes('gracias')) {
        //Agradecimiento
        var model = MessageText('Gracias a ti por escribirme', number)
        models.push(model)
    } else if(textUser.includes('adios') || textUser.includes('bye') || textUser.includes('hasta luego')) {
        //Agradecimiento
        var model = MessageText('Fue un placer asistirte, cuidate', number)
        models.push(model)
    } else if(textUser.includes('comprar')) {
        //Comprar
        var model = MessageButton(number)
        models.push(model)
    } else if(textUser.includes('vender')) {
        //Vender
        var model = MessageText('Registrate en el siguiente formulario: https://docs.google.com/forms/d/e/1FAIpQLSfu-B5Jfy1UzvEBmN-_O8dQloFdhW37kQbWeWuIi5Zh7fKCbw/viewform?usp=sf_link', number)
        models.push(model)
    }  else if(textUser.includes('agencia') || textUser.includes('ubicacion') || textUser.includes('ubicación')) {
        //Vender
        //var model = MessageLocation(number)        
        models.push(MessageText('Esta es nuesta ubicación', number))
        models.push(MessageLocation(number))
    }  else if(textUser.includes('contacto')) {
        //Vender
        var model = MessageText('*Centro de contacto:*\n818.252.2653',number)
        models.push(model)
    } else {
        var model = MessageText('No entiendo', number)
        models.push(model)
    }
*/
    models.forEach(model => {
        SendMessageWhatsApp(model)
    });
}

function normalizarMensaje(mensaje) {
    // Convertir a minúsculas
    let mensajeNormalizado = mensaje.toLowerCase();
  
    // Eliminar signos de puntuación y caracteres especiales
    mensajeNormalizado = mensajeNormalizado.replace(/[^\w\s]/g, '');
  
    // Eliminar espacios en blanco лишние
    mensajeNormalizado = mensajeNormalizado.trim().replace(/\s+/g, ' ');
  
    return mensajeNormalizado;
}

// async function buscarRespuesta(mensaje) {
//     return new Promise((resolve, reject) => {
//         console.log('antes del pool ', mensaje);
//         const query = 'CALL getwhatsappFrases(?)';
  
//         pool.getConnection((err, connection) => { // Obtener una conexión del pool
//             if (err) {
//               console.error('Error al obtener conexión del pool:', err);
//               return reject(err);
//             }
      
//             connection.query(query, [mensaje], (err, results) => {
//               connection.release(); // Liberar la conexión de vuelta al pool
      
//               if (err) {
//                 console.error('Error en la consulta:', err);
//                 return reject(err);
//               }
      
//               if (results && results[0] && results[0].length > 0) {
//                 resolve(results[0][0]);
//               } else {
//                 resolve(null);
//               }
//             });
//         });
//     });
// }