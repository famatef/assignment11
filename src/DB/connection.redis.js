import { createClient } from "redis";
import { REDIS_URL } from "../../config/confg.servive.js";



 export const redis_client = createClient({
     url: REDIS_URL
    });
    export default async function connectionRedis() {
     try {
      await redis_client.connect();
      console.log("Redis connected");
     } catch (err) {
      console.log("Redis connection error", err);
     }
    }
