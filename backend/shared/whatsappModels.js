export function MessageText(textResponse, number) {
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