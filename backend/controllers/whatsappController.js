//const fs = require('fs')
//const myConsole = new console.Console(fs.createWriteStrem("./logs.txt"))
import { response } from "express"
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from "url"
import { appendToJsonLog } from "../helpers/jsonLog.js"
import { SendMessageWhatsApp } from "../services/whatsappService.js"
//import { SampleButton, SampleImage, SampleVideo, SampleAudio, SampleDocument, SampleList, SampleLocation, SampleText } from "../shared/sampleModels.js"
import { Process } from '../shared/processMessaje.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

import { pool } from "../db.js"

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
export const ReceivedMessage = async (req, res) => {
    try {

        var entry = (req.body["entry"])[0]
        var changes = (entry["changes"])[0]
        var value = changes["value"]
        var messageObject = value["messages"]
        
        if (typeof messageObject != 'undefined') {

            var messages =messageObject[0]
            var number = normalizePhoneNumber(messages["from"])
            
            var text = GetTextUser(messages)
            console.log('ReceivedMessage:', text)

            if (text != "") {
                await Process(text, number)

            } else {
                var data = SampleText("No entiendo.", number)
                SendMessageWhatsApp(data)                
            } /*else if (text == "image") {
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
            }*/
            
            //console.log(text)
        }   

        res.send("EVENT_RECEIVED")
    } catch (error) {
        console.log(error)
        res.send("EVENT_RECEIVED")
    }
    //res.send("Hola Received")
}

//Obtiene el mensaje
function GetTextUser(messages) {
    //console.log('messages: ', messages)
    var text = "";
    var typeMessage = messages["type"]

    //console.log('typeMessage: ', typeMessage)

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

// Elimina el "1" adicional después del código de país 52 (si existe)
function normalizePhoneNumber(phoneNumber) {
    return phoneNumber.replace(/^521/, '52');
}

