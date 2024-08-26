import { config } from "dotenv"

config()

//Cloud server
export const PORT = 8080
export const DB_HOST = "104.200.137.56"
export const DB_PORT = 3306
export const DB_DATABASE = "crm"
export const DB_USER = "appusercrmadmin"
export const DB_PASSWORD = "@m.YFDS]c2rkU9MQ"

// Local
// export const PORT = process.env.PORT || 8080
// export const DB_HOST = process.env.DB_HOST || "104.200.137.56"
// export const DB_PORT = process.env.DB_PORT || 3306
// export const DB_DATABASE = process.env.DB_DATABASE || "crm"
// export const DB_USER = process.env.DB_USER || "appusercrmadmin"
// export const DB_PASSWORD = process.env.DB_PASSWORD || "@m.YFDS]c2rkU9MQ"
