//const fs = require('fs')
//const myConsole = new console.Console(fs.createWriteStrem("./logs.txt"))

import { response } from "express"
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from "url"
import { appendToJsonLog } from "../helpers/jsonLog.js"


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
        
        var messageObject = JSON.stringify(value["messages"])

        var displayPhoneNumber = value.metadata.display_phone_number
        //const displayPhoneNumber = req.body.entry[0].changes[0].value.metadata.display_phoneNumber;
        //console.log('Display phone number:', displayPhoneNumber);
        //console.log('valueJSON: ', valueJSON)
        //const displayPhoneNumber = value.metadata.displayPhoneNumber
        console.log('try 2')
        console.log('display_phoneNumber: ', displayPhoneNumber)


        appendToJsonLog(messageObject, displayPhoneNumber)


        //myConsole.log(messageObject)
        var message = messageObject
        const logFilePath = path.join(__dirname, "../", 'logs', 'whatsapp.log'); // Ruta al archivo de log
        const timestamp = new Date().toISOString();
      
        fs.appendFile(logFilePath, `${timestamp} - ${message}\n`, (err) => {
          if (err) {
            console.error('Error al escribir en el archivo de log:', err);
          }
        });        

        res.send("EVENT_RECEIVED")
    } catch (error) {
        console.log(error)
        res.send("EVENT_RECEIVED")
    }
    //res.send("Hola Received")
}