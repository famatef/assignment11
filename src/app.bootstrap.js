
import express from "express";
import { rateLimit } from "express-rate-limit";
import { PORT } from "../config/config.service.js"


const app = express();


const port = PORT;
import helmet from "helmet";

import cors from "cors";
import userRouter from "./modules/user/user.controller.js";
import { redis_client } from "./DB/connection.redis.js";
import messageRouter from "./modules/messages/message.controller.js";

import 
    connectionDB
 from "./DB/connectionDB.js";
 import connectionRedis from "./DB/connection.redis.js";
const limiter = rateLimit(
    {
        windowMs: 60 * 1000,
        
        limit:1,
        message:{
            success:false,
            message:"Game over"
            
            
        },
    }
)
const allowOrigins = ["http://localhost:4000",undefined]


export const bootstrap = async () => {
    app.use(cors(
        {origin:function (origin,callback){
            if(allowOrigins.includes(origin)){
                callback(null,true)
            }else{
                callback(new Error("this origin not allow"))
            }
        }
           
    }));
app.set("case sensitive routing", true);
app.set("strict routing", true);

    app.use(express.json(),limiter,helmet);
    await connectionDB();
    await connectionRedis();
    await redis_client.set("name", "saraha");
    app.get("/", (req, res) => {
        res.send("welcome on saraha app");
    });
    app.use("/users", userRouter);
    app.use("/messages", messageRouter);
    app.use((req, res, next) => {
        throw new Error(`Url:${req.originalUrl} with method:${req.method} not found`, { cause: 404 });
    });
    
    app.use((err, req, res, next) => {
        console.log(err);
        res.status(err.cause || 500).json({
            message: err.message,
        });
    });
    
    app.listen(port, () => {

        console.log(
            `Server running on port ${port}`
        );

    });

};

export default bootstrap;
