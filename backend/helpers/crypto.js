import cryptoJs from "crypto-js";
import { config } from "dotenv"

config()

//const SECRET_KEY = "tu_clave_secreta";
const SECRET_KEY = process.env.FRONT_APP_SECRET_KEY

// Función para encriptar datos
export const encryptData = (data) => {
  return cryptoJs.AES.encrypt(JSON.stringify(data), SECRET_KEY).toString();
};

// Función para desencriptar datos
export const decryptData = (encryptedData) => {
  const bytes = cryptoJs.AES.decrypt(encryptedData, SECRET_KEY);
  return JSON.parse(bytes.toString(cryptoJs.enc.Utf8));
};