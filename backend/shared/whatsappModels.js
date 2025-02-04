export function MessageText(textResponse, number) {
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

export function MessageMenu(number) {
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
                        "title": "Menú de opciones",
                        "rows": [
                            {
                                "id": "mnu-pedido",
                                "title": "Hacer Pedido",
                                "description": "Hacer un pedido"
                            },
                            {
                                "id": "mnu-estatusPedido",
                                "title": "Ver estatus del pedido",
                                "description": "Mostrar estado del pedido, cancelar un pedido"
                            },                            
                            {
                                "id": "mnu-ubicacion",
                                "title": "Ubicación",
                                "description": "Mostrar ubicación"
                            },
                            {
                                "id": "mnu-formasDePago",
                                "title": "Formas de Pago",
                                "description": "Mostrar las formas de pago"
                            },
                            {
                                "id": "mnu-puntosDeEntrega",
                                "title": "Puntos de Entrega",
                                "description": "Mostrar puntos de entrega"
                            },
                            {
                                "id": "mnu-horario",
                                "title": "Horario",
                                "description": "Mostrar horario"
                            },
                            {
                                "id": "mnu-dejarMensaje",
                                "title": "Dejar un mensaje",
                                "description": "Mostrar forma de contacto"
                            },
                            {
                                "id": "mnu-contactarRepresentante",
                                "title": "Contactar a un representante",
                                "description": "Contactar a un representante via whatsapp"
                            }
                        ]
                    }                   
                ]
            }
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

export function MessageLocation(number) {
    const data = JSON.stringify({
        "messaging_product": "whatsapp",    
        "to": number,
        "type": "location",
        "location": {
            "latitude": "25.743852774131685",
            "longitude": "-100.2266610432757",
            "name": "Casa",
            "address": "Del Estanque 135, Palmas Diamante, Cerradas de Casa Blanca, 66478 San Nicolás de los Garza, N.L."
        }
    })
    return data
}