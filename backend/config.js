import { config } from "dotenv"

config()

//Cloud server
// export const PORT = 8080
// export const DB_HOST = "104.200.137.56"
// export const DB_PORT = 3306
// export const DB_DATABASE = "crm"
// export const DB_USER = "appusercrmadmin"
// export const DB_PASSWORD = "@m.YFDS]c2rkU9MQ"
//TODO: REVISAR SOLO DEJANDO LAS CONSTANTES QUE LAS TOME DE .ENV
// intercambiado solamente PORT Y DB_HOST EN .ENV,
///PROBAR CON EL PUERTO 3000 DEL SERVIDOR DEJANDO EL DB_HOST "104.200.137.56"

// //Cloud server
// export const PORT = 3000 //puerto local  en el que corre el servidor
// export const DB_HOST = "104.200.137.56"
// export const DB_PORT = 3306
// export const DB_DATABASE = "crm"
// export const DB_USER = "appusercrmadmin"
// export const DB_PASSWORD = "@m.YFDS]c2rkU9MQ"

// Local
// export const PORT = process.env.PORT
// export const DB_HOST = process.env.DB_HOST
// export const DB_PORT = process.env.DB_PORT
// export const DB_DATABASE = process.env.DB_DATABASE
// export const DB_USER = process.env.DB_USER
// export const DB_PASSWORD = process.env.DB_PASSWORD

// Local
export const PORT = process.env.PORT || 3306
export const DB_HOST = process.env.DB_HOST || "206.130.120.129"
export const DB_PORT = process.env.DB_PORT || 3306
export const DB_DATABASE = process.env.DB_DATABASE || "crm"
export const DB_USER = process.env.DB_USER || "appusercrmadmin"
export const DB_PASSWORD = process.env.DB_PASSWORD || "@m.YFDS]c2rkU9MQ"


