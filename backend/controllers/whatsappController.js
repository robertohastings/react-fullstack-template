//const fs = require('fs')
//const myConsole = new console.Console(fs.createWriteStrem("./logs.txt"))

import { response } from "express"
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from "url"
import { appendToJsonLog } from "../helpers/jsonLog.js"
import { SendMessageWhatsApp } from "../services/whatsappService.js"
import { SampleButton, SampleImage, SampleVideo, SampleAudio, SampleDocument, SampleList, SampleLocation, SampleText } from "../shared/sampleModels.js"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export const VerifyToken = (req, res) => {
    
    try {
        var accessToken = "RVHDKLKJGSKMSL2983726LSFI"
        var token = req.query["hub.verify_token"]
        var challenge = req.query["hub.challenge"]

        if (challenge != null && token !=  null && token == accessToken) {
            res.send(challenge)
        } else {
            res.status(400).send
        }
        
    } catch (error) {
        res.status().send();
    }
    //res.send("hola verifyToken")
}
//ctl k + M
//TODO: CONOCER EL PHONE_NUMBER_ID DE LA APP PARA CREAR UN ARCHIVO JSON POR CADA UNO
export const ReceivedMessage = (req, res) => {
    try {
        console.log(`Body: ${JSON.stringify(req.body)}`)
        var entry = (req.body["entry"])[0]
        var changes = (entry["changes"])[0]
        var value = changes["value"]
        var messageObject = value["messages"]

        var messageObjectLog = JSON.stringify(value["messages"])
        var displayPhoneNumber = value.metadata.display_phone_number
        
        console.log('try 3')
        
        if (typeof messageObject != 'undefined') {
            console.log('messageObject:', messageObject)

            var messages =messageObject[0]
            var number = normalizePhoneNumber(messages["from"])
            
            var text = GetTextUser(messages)

            if (text == "text") {
                var data = SampleText("hola usuario", number)
                SendMessageWhatsApp(data)
            } else if (text == "image") {
                var data = SampleImage(number)
                SendMessageWhatsApp(data)             
            } else if (text == "video") {
                var data = SampleVideo(number)
                SendMessageWhatsApp(data)             
            } else if (text == "audio") {
                var data = SampleAudio(number)
                SendMessageWhatsApp(data)             
            } else if (text == "document") {
                var data = SampleDocument(number)
                SendMessageWhatsApp(data)             
            } else if (text == "button") {
                var data = SampleButton(number)
                SendMessageWhatsApp(data)             
            } else if (text == "list") {
                var data = SampleList(number)
                SendMessageWhatsApp(data)             
            } else if (text == "location") {
                var data = SampleLocation(number)
                SendMessageWhatsApp(data)             
            } else {
                var data = SampleText("No entiendo", number)
                SendMessageWhatsApp(data)                
            }
            
            console.log(text)
        }

        //console.log('try 2')
        //console.log('display_phoneNumber: ', displayPhoneNumber)

        //lo detuve provisionalmente
        //appendToJsonLog(messageObjectLog, displayPhoneNumber)


        //myConsole.log(messageObject)
/*         var message = messageObject
        const logFilePath = path.join(__dirname, "../", 'logs', 'whatsapp.log'); // Ruta al archivo de log
        const timestamp = new Date().toISOString();
      
        fs.appendFile(logFilePath, `${timestamp} - ${message}\n`, (err) => {
          if (err) {
            console.error('Error al escribir en el archivo de log:', err);
          }
        });   */      

        res.send("EVENT_RECEIVED")
    } catch (error) {
        console.log(error)
        res.send("EVENT_RECEIVED")
    }
    //res.send("Hola Received")
}

function GetTextUser(messages) {
    var text = "";
    var typeMessage = messages["type"]

    if (typeMessage == 'text') {
        text = (messages["text"])["body"]
    } else if (typeMessage == 'interactive') {
        var interactiveObject = messages["interactive"]
        var typeInteractive = interactiveObject["type"]        

        if (typeInteractive == "button_reply") {
            text = (interactiveObject["button_replay"])["title"]
        } else if (typeInteractive == "list_reply" ) {
            text = (interactiveObject["list_reply"])["title"]
        } else {
            console.log("Sin mensaje")
        }
    } else  {
        console.log("Sin mensaje")
    }
    return text
}

function normalizePhoneNumber(phoneNumber) {
    // Elimina el "1" adicional después del código de país 52 (si existe)
    return phoneNumber.replace(/^521/, '52');
}