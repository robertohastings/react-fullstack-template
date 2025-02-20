import CryptoJS from "crypto-js"

//const SECRET_KEY = "tu_clave_secreta";
const SECRET_KEY = process.env.REACT_APP_SECRET_KEY

// Función para encriptar datos
export const encryptData = data => {
    return CryptoJS.AES.encrypt(JSON.stringify(data), SECRET_KEY).toString()
}

// Función para desencriptar datos
export const decryptData = encryptedData => {
    //console.log(`encryptedData: ${encryptedData}`)
    //console.log(`secret key: ${SECRET_KEY}`)
    const bytes = CryptoJS.AES.decrypt(encryptedData, SECRET_KEY)
    //console.log("bytes:", bytes)
    //console.log("Bytes: ", bytes.toString(CryptoJS.enc.Utf8))
    return JSON.parse(bytes.toString(CryptoJS.enc.Utf8))
}

// Función para almacenar en localStorage encriptado
export const setEncryptedItem = (key, data) => {
    const encryptedData = encryptData(data)
    localStorage.setItem(key, encryptedData)
}

// Función para recuperar y desencriptar desde localStorage
export const getDecryptedItem = key => {
    console.log("keygetDecrypted -> key", key)
    const encryptedData = localStorage.getItem(key)
    //console.log("antes del decryptdata encryptedData:", encryptedData)
    //const id_empresa = decryptData(encryptedData)
    //console.log('decryptData', id_empresa)
    if (!encryptedData) return null
    return decryptData(encryptedData)
}
