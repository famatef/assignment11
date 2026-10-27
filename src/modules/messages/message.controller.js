import {Router} from "express";
import * as MS from "./message.service.js"
import * as MV from "./message.validation.js"
import {authentication} from "../../common/middleware/authentication.js"
import {validation} from "../../common/middleware/validation.js"
import {multerLocal} from "../../common/middleware/multer.js"
import {Multer_Enum} from "../../common/enum/multer.enum.js"

const messageRouter = Router({strict: true,caseSensitive: true,mergeParams: true});

messageRouter.post("/", authentication, multerLocal({
    customPath: "messages",
    customTypes: Multer_Enum.image,
}).array("attachments",3),validation(MV.createMessageSchema),MS.createMessage);
messageRouter.get("/", authentication, MS.getMessage);
messageRouter.get("/:id", authentication, MS.getMessageById);

export default messageRouter;
