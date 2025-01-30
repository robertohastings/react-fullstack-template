import { MessageText, MessageList, MessageButton, MessageLocation } from '../shared/whatsappModels.js'
import { SendMessageWhatsApp } from '../services/whatsappService.js'

export function Process(textUser, number) {
    textUser = textUser.toLowerCase()

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
    }  else if(textUser.includes('agencia')) {
        //Vender
        var model = MessageText('*Centro de contacto:*\n818.252.2653',number)
        models.push(model)
    }  else if(textUser.includes('contacto')) {
        //Vender
        var model = MessageLocation(number)
        models.push(model)
    } else {
        var model = MessageText('No entiendo', number)
        models.push(model)
    }

    models.forEach(model => {
        SendMessageWhatsApp(model)
    });
}