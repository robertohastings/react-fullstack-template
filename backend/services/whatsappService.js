import https from 'https'

export function SendMessageWhatsApp(textResponse, number) {
    console.log('textResponse: ', textResponse)
    console.log('number ', number)
    const data = JSON.stringify({
        "messaging_product": "whatsapp",    
        "to": number,
        "type": "text",
        "text": {
            "body": textResponse
        } 
    })

    const options = {
        host: "graph.facebook.com",
        path: "/v21.0/511943852010365/messages",
        method: "POST",
        body: data,
        headers: {
            "Content-Type": "application/json",
            Autorization: "Bearer EAAGuUPmkVdoBO3fFIwE76HHtL8PQutLMiZBS7ouSEXNEOjLygQLXcOiqA8hkFZB8BLTW9KpUYPg1zByH5AMS7fxsiAJwSHZB8SHaJ8FsMj7S0IA7OwQqatvpPK3nKEcIzOJDBSZCZC4ytYZBUZAZAlcxZCqFtvZASO8spCJ1tDjlWXG3ThsgU9exEDZBDCUhe3zaCxl2wZDZD"
        }
    }

    const req = https.request(options, res => {
        res.on("data", d => {
            process.stdout.write(d)
        })
    })

    req.on("error", error => {
        console.error(error)
    })

    req.write(data)
    req.end()

}
