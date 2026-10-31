import { config } from "dotenv";
import {  resolve } from "node:path";


const NODE_ENV = process.env.NODE_ENV 
const envPath={
    development: ".env.development",
    production: ".env.production",
}

config({ path: resolve(`./config/${envPath[NODE_ENV]}`) });

export const PORT = +process.env.PORT;
export const DB_URI = process.env.DB_URI;
export const REDIS_URL = process.env.REDIS_URL;
export const DB_URL_ONLINE= process.env.DB_URL_ONLINE
