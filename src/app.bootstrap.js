import express from "express";

const app = express();
const port = 3000;
import cors from "cors";
import userRouter from "./modules/user/user.controller.js";
import { redis_client } from "./DB/connection.redis.js";
import messageRouter from "./modules/messages/message.controller.js";

import 
    connectionDB
 from "./DB/connectionDB.js";
 import connectionRedis from "./DB/connection.redis.js";

export const bootstrap = async () => {
    app.use(cors(
        {origin:"*"
}));

    app.use(express.json());
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
            "Server running on port 3000"
        );

    });

};

export default bootstrap;
