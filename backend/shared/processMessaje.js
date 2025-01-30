import { MessageText } from '../shared/whatsappModels.js'
import { SendMessageWhatsApp } from '../services/whatsappService.js'

export function Process(textUser, number) {
    textUser = textUser.toLowerCase()

    var models = []

    if (textUser.includes('hola')) {
        //Saludar
        var model = MessageText('Hola, me da gusto saludarte', number)
        models.push(model)
    } else if(textUser.includes('gracias')) {
        //Agradecimiento
        var model = MessageText('Gracias a ti por escribirme', number)
        models.push(model)
    } else if(textUser.includes('adios') || textUser.includes('bye') || textUser.includes('hasta luego')) {
        //Agradecimiento
        var model = MessageText('Fue un placer asistirte, cuidate', number)
        models.push(model)
    } else {
        var model = MessageText('No entiendo', number)
        models.push(model)
    }

    models.forEach(model => {
        SendMessageWhatsApp(model)
    });
}