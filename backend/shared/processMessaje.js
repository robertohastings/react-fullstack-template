import { MessageText, MessageList, MessageButton, MessageLocation } from '../shared/whatsappModels.js'
import { SendMessageWhatsApp } from '../services/whatsappService.js'
import { getwhatsappFrases } from '../controllers/whatsappController.js'
import { pool } from '../db.js';

export async function Process(textUser, number) {
    const mensajeNormalizado = normalizarMensaje(textUser);

    //textUser = textUser.toLowerCase()
    textUser = mensajeNormalizado
    console.log(`text user mensaje normalizado: ${textUser}`)

    const resultado = await buscarRespuesta(mensajeNormalizado);
    console.log(`respueta encontrada en db: ${resultado}`)

    var models = []

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

async function buscarRespuesta(mensaje) {
    return new Promise((resolve, reject) => {
        console.log('buscar respuesta 1')
      const query = 'CALL getwhatsappFrases(?)'; // Llama al procedimiento almacenado
      pool.query(query, [mensaje], (err, results) => {
        if (err) {
            console.log('buscar respuesta 2')
          reject(err);
          return;
        }
        console.log('buscar respuesta 3')
        // getwhatsappFrases devuelve un array de resultados. Si encuentra una coincidencia,
        // results[0][0] contendrá el objeto con la respuesta y la función.
        if (results[0].length > 0) {
            console.log('buscar respuesta 4')
          resolve(results[0][0]);
        } else {
            console.log('buscar respuesta 5')
          resolve(null);
        }
      });
    });
}