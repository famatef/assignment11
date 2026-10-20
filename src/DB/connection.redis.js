import { createClient } from "redis";
 export const redis_client = createClient({
     url: "rediss://default:gQAAAAAAApyUAAIgcDEzZWZjOWE5Nzc0MDY0YTU5YmIzZTBjYzM1MTI4Zjc4NA@striking-buzzard-171156.upstash.io:6379"
    });
    export default async function connectionRedis() {
     try {
      await redis_client.connect();
      console.log("Redis connected");
     } catch (err) {
      console.log("Redis connection error", err);
     }
    }