import { getWhatsapp_ubicacion } from '../controllers/catalagosController.js'

export async function MessageText(textResponse, number) {
    console.log('MessageText textResponse: ', textResponse)
    const data = JSON.stringify({
        "messaging_product": "whatsapp",    
        "to": number,
        "type": "text",
        "text": {
            "preview_url": true,
            "body": textResponse
        } 
    })
    return data
}

export async function MessageMenu(textResponse, number) {
    const data = JSON.stringify({
        "messaging_product": "whatsapp",    
        "to": number,
        "type": "interactive",
        "interactive": {
            "type": "list",
            "body": {
                "text": "Nuestro menú"
            },
            "header": {
                "type": "text",
                "text": "Menú principal"
            },
            "footer": {
                "text": "Elige una opción"
            },
            "action": {
                "button": "Ver opciones",
                "sections": [
                    {
                        "title": "Menú de opciones",
                        "rows": [
                            {
                                "id": "mnu-pedido",
                                "title": "Ordenar o hacer Pedido",
                                "description": "Realiza un pedido"
                            },
                            {
                                "id": "mnu-estatusPedido",
                                "title": "Etatus del pedido",
                                "description": "Ve el estatus del pedido, cancelar el pedido"
                            },                            
                            {
                                "id": "mnu-ubicacion",
                                "title": "Ubicación",
                                "description": "Ve como llegar por google maps"
                            },
                            {
                                "id": "mnu-formasDePago",
                                "title": "Formas de Pago",
                                "description": "Ve las formas de pago disponibles"
                            },
                            {
                                "id": "mnu-puntosDeEntrega",
                                "title": "Puntos de Entrega",
                                "description": "Ve nuestros puntos de entrega"
                            },
                            {
                                "id": "mnu-horario",
                                "title": "Horario",
                                "description": "Ve nuesto horario laboral"
                            },
                            {
                                "id": "mnu-dejarMensaje",
                                "title": "Dejar un mensaje",
                                "description": "Llena nuestro forulario de contacto"
                            },
                            {
                                "id": "mnu-contactarRepresentante",
                                "title": "Atención personalizada",
                                "description": "Contacta a un representante via whatsapp"
                            }
                        ]
                    }                   
                ]
            }
        }
    })
    return data
}

export async function MessageLocation(textResponse, number) {
    //TODO: Buscar la relación empresa vs whats app identidad
    const dataEmpresa = await getWhatsapp_ubicacion(1)
    console.log('empresa: ', dataEmpresa)

    const { latitud, longitud, direccion} = dataEmpresa.empresa[0]
    console.log('latitud:', latitud)
    console.log('longitud:', longitud)

    const data = JSON.stringify({
        "messaging_product": "whatsapp",    
        "to": number,
        "type": "location",
        "location": {
            "latitude": latitud,
            "longitude": longitud,
            "name": textResponse,
            "address": direccion
        }
    })
    console.log('MessageLocation data->', data)
    return data
}

export async function MessageLinkFormaDePago(textResponse, number) {
    //TODO: Buscar la relación empresa vs whats app identidad
    const dataFormasDePago = await getWhatsapp_formasDePago(1)
    const formasDePago = dataFormasDePago[0]

    formasDePago.map(formaDePago, index) {
        formasDePago += formaDePago
    }

    const data = JSON.stringify({
        "messaging_product": "whatsapp",    
        "to": number,
        "type": "text",
        "text": {
            "preview_url": true,
            "body": textResponse
        } 
    })
    return data
}

export function MessageList(number) {
    const data = JSON.stringify({
        "messaging_product": "whatsapp",    
        "to": number,
        "type": "interactive",
        "interactive": {
            "type": "list",
            "body": {
                "text": "Selecciona una opción:"
            },
            "header": {
                "type": "text",
                "text": "Menú principal"
            },
            "footer": {
                "text": "Elige una opción"
            },
            "action": {
                "button": "Ver opciones",
                "sections": [
                    {
                        "title": "Compra y vende productos",
                        "rows": [
                            {
                                "id": "option1",
                                "title": "Comprar",
                                "description": "Compra los mejores productos para tu hogar"
                            },
                            {
                                "id": "option2",
                                "title": "Vender",
                                "description": "Vende tus productos"
                            }
                        ]
                    },
                    {
                        "title": "Centro de atención",
                        "rows": [
                            {
                                "id": "option3",
                                "title": "Agencia",
                                "description": "Puedes visitar nuestra agencia"
                            },
                            {
                                "id": "option4",
                                "title": "Centro de contacto",
                                "description": "Te atenderá uno de nuestros agentes"
                            }
                        ]
                    }                    
                ]
            }
        }
    })
    return data
}

export function MessageButton(number) {
    const data = JSON.stringify({
        "messaging_product": "whatsapp",    
        "to": number,
        "type": "interactive",
        "interactive": {
            "type": "button",
            "body": {
                "text": "Selecciona uno de los productos"
            },
            "action": {
                "buttons": [
                    {
                        "type": "reply",
                        "reply": {
                            "id": "option-laptop",
                            "title": "Laptop"
                        }
                    },
                    {
                        "type": "reply",
                        "reply": {
                            "id": "option-computadora",
                            "title": "Computadora"
                        }
                    }
                ]
            }
        }
    })
    return data
}

