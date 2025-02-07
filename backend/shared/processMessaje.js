import { MessageText, MessageMenu } from '../shared/whatsappModels.js'
import { SendMessageWhatsApp } from '../services/whatsappService.js'
import { usarDatos, postWhatsappFrasesNoReconocidas  } from '../controllers/catalagosController.js'

export async function Process(textUser, number) {
    const mensajeNormalizado = normalizarMensaje(textUser);

    textUser = mensajeNormalizado
    console.log('texto normalizado:', textUser)

    //Busco el texto del usuario en la tabla whatsapp_frases
    //TODO: Implmentar la memoria chache
    //const resultado = await usarDatos(textUser)



    const funciones = {
        MessageText: MessageText,
        MessageMenu: MessageMenu
    }

    usarDatos(textUser).then(async resultado => {
        const { respuesta, funcion } = resultado.frase[0]
        console.log('usarDatos respuesta:', respuesta, ' usarDatos funcion:', funcion)

        if (respuesta === 'No entiendo...'){
            const frases_no_reconocidas = await postWhatsappFrasesNoReconocidas(textUser, number)
            console.log('post frases_no_reconocidas:', frases_no_reconocidas)            
        }

        var models = []

        // Verifica que la función exista antes de llamarla
        if (typeof funciones[funcion] === 'function') { // <-- Importante verificación
            const mensaje = funciones[funcion](respuesta, number) // Llama a la función dinámicamente
            console.log("Mensaje de la función:", mensaje); // Aquí tienes el resultado de MessageText
            
            models.push(mensaje)
        } else {
            //console.error("La función", funcion, "no existe.");
            var model = MessageText('No entiendo..', number)
            models.push(model)
        }
    
        console.log('models:', models)
        models.forEach(model => {
            SendMessageWhatsApp(model)
        });
    })
    .catch(error => {
        console.error("Error en la llamada:", error);
        var model = MessageText('No entiendo', number)
        models.push(model)
    });    

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
    // console.log('Respuesta data:', respuestaData)
    // models.forEach(model => {
    //     SendMessageWhatsApp(model)
    // });
}

function normalizarMensaje(mensaje) {
    // Convertir a minúsculas
    let mensajeNormalizado = mensaje.toLowerCase();
  
    // Eliminar signos de puntuación y caracteres especiales
    mensajeNormalizado = mensajeNormalizado.replace(/([áéíóú])/g, function(match) {
        switch (match) {
          case 'á':
            return 'a';
          case 'é':
            return 'e';
          case 'í':
            return 'i';
          case 'ó':
            return 'o';
          case 'ú':
            return 'u';
          default:
            return match;
        }
      });
  
    // Eliminar espacios en blanco лишние
    mensajeNormalizado = mensajeNormalizado.trim().replace(/\s+/g, ' ');
  
    return mensajeNormalizado;
}