
export function SampleText(textResponse, number) {
    const data = JSON.stringify({
        "messaging_product": "whatsapp",    
        "to": number,
        "type": "text",
        "text": {
            "body": textResponse
        } 
    })
    return data
}
export function SampleImage(number) {
    const data = JSON.stringify({
        "messaging_product": "whatsapp",    
        "to": number,
        "type": "image",
        "image": {
            "link": "https://res.cloudinary.com/ddhxa9igj/image/upload/v1699165138/large_cursos_bg_8c878aaf6b.jpg"
        } 
    })
    return data
}
export function SampleAudio(number) {
    const data = JSON.stringify({
        "messaging_product": "whatsapp",    
        "to": number,
        "type": "audio",
        "audio": {
            "link": "https://biostoragecloud.blob.core.windows.net/resource-udemy-whatsapp-node/audio_whatsapp.mp3"
        } 
    })
    return data
}
export function SampleVideo(number) {
    const data = JSON.stringify({
        "messaging_product": "whatsapp",    
        "to": number,
        "type": "video",
        "video": {
            "link": "https://biostoragecloud.blob.core.windows.net/resource-udemy-whatsapp-node/video_whatsapp.mp4",
            "caption": "Ejemplo video"
        } 
    })
    return data
}
export function SampleDocument(number) {
    const data = JSON.stringify({
        "messaging_product": "whatsapp",    
        "to": number,
        "type": "document",
        "document": {
            "link": "https://biostoragecloud.blob.core.windows.net/resource-udemy-whatsapp-node/document_whatsapp.pdf",
            "caption": "Robert document",
            "filename": "document_whatsapp.pdf"
        } 
    })
    return data
}
export function SampleButton(number) {
    const data = JSON.stringify({
        "messaging_product": "whatsapp",    
        "to": number,
        "type": "interactive",
        "interactive": {
            "type": "button",
            "body": {
                "text": "¿Confirmas tu registro?"
            },
            "action": {
                "buttons": [
                    {
                        "type": "reply",
                        "reply": {
                            "id": "001",
                            "title": "Si"
                        }
                    },
                    {
                        "type": "reply",
                        "reply": {
                            "id": "002",
                            "title": "No"
                        }
                    }
                ]
            }
        }
    })
    return data
}
export function SampleList(number) {
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
                "button": "Seleccionar",
                "sections": [
                    {
                        "title": "Opciones",
                        "rows": [
                            {
                                "id": "option1",
                                "title": "Opción 1",
                                "description": "Descripción de la opción 1"
                            },
                            {
                                "id": "option2",
                                "title": "Opción 2",
                                "description": "Descripción de la opción 2"
                            }
                        ]
                    }
                ]
            }
        }
    })
    return data
}
export function SampleLocation(number) {
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