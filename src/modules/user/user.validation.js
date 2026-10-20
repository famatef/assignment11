import Joi from "joi";
import { generalRules } from "../../common/utils/generalRules.js";
export const signupScehema = {body: Joi.object({
    fname: Joi.string().trim().min(3).max(20).required(),
    lname: Joi.string().trim().min(3).max(20).required(),
    email: generalRules.email.required(),
    gender: Joi.string().valid("male", "female").required(),
    password: generalRules.password.required(),
    cpassword: Joi.string().valid(Joi.ref("password")).required(),
    
    
    age: Joi.number().min(18).max(100).required(),
    phone: Joi.string().trim().required()
    
}).required(),
files: Joi.object({
    attachment:Joi.array().items(generalRules.file.required()).required(),
    attachments:Joi.array().items(generalRules.file.required()).required(),
        
}).required()
}
export const signinScehema = {
    body: Joi.object({
        email: generalRules.email.required(),
        password: generalRules.password.required(),
    }).required(),
}
export const refreshTokenSchema = {
    headers: Joi.object({
        authorization: Joi.string().required(),
    }).unknown(true),
        
}
export const shareProfileSchema = {
    params: Joi.object({
        id: Joi.string().hex().length(24).required(),
    }).required(),
        
}
export const updateProfileSchema = {
    body: Joi.object({
        fname: Joi.string().alphanum().min(3).max(20),
        lname: Joi.string(),
        phone: Joi.string(),
        gender: Joi.string().valid("male", "female"),
        age: Joi.number(),
        
    }).required(),
        
}
export const updatePasswordSchema = {
    body: Joi.object({
        oldPassword: generalRules.password.required(),
        newPassword: generalRules.password.required(),
    }).required(),
}
export const confirmEmailSchema = {
    body: Joi.object({
        email: Joi.string().required(),
        otp: Joi.string().pattern(/^[0-9]{6}$/).required(),
    }).required(),
}
export const resetPasswordSchema = {
    body: Joi.object({
        email: generalRules.email.required(),
        otp: Joi.string().pattern(/^[0-9]{6}$/).required(),
        newPassword: generalRules.password.min(8).required(),
    }).required(),
}
