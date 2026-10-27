import Joi from "joi";
import { generalRules } from "../../common/utils/generalRules.js";
 export const createMessageSchema = {
    body : Joi.object({
        content: Joi.string()
    }).required(),
    files: Joi.array().items(generalRules.file).max(3),
 }
 
