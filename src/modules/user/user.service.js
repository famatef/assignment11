import userModel from "../../DB/models/user.model.js";
import * as dbservice from "../../DB/db.service.js";
import { Encrypt, Decrypt } from "../../common/security/encrypt.js";
import { hash, compare } from "../../common/security/hash.js";
import jwt from "jsonwebtoken";
import {OAuth2Client} from'google-auth-library';
import { ProviderEnum } from "../../common/enum/user.enum.js";



const client = new OAuth2Client();
    

export const signup = async (req, res,next) => {
    
    const { fname, lname, email, age,gender,phone,password } = req.body;
    const paths=[]
    
    if (req.files?.attachments) {
  for (const file of req.files.attachments) {
    paths.push(file.path);
  }
}
else{
    paths.push(req.files.attachment[0].path)
}
    
    if (await userModel.findOne({ email: email.toLowerCase() })) {
        return res.status(409).json({ message: "email already exists" });
    }
    const user = await dbservice.create({
        model: userModel,
        data: {
            fname,
            lname,
            email,
            age,
            gender,
            phone: Encrypt(phone),
            password: await hash(password),
            profileImage: req.files.attachment[0].path,
            coverImages: paths

        },
    });


     
    
    
    




return res.status(200).json({
        message: "success",

})
}


export const signupGmail = async (req, res,next) => {
    const { idToken } = req.body;
    
    
      const decoded = await client.verifyIdToken({
        idToken,
        audience: "272786427705-fhkjaja9u9gcr870d7betnl55ir8ru29.apps.googleusercontent.com"

  });
         const { email, given_name, family_name, picture, email_verified } = decoded.getPayload();
     let user = await userModel.findOne({ email: email.toLowerCase() });
     if (!user) {
        user =await userModel.create({

            fname: given_name,
            lname: family_name,
            email,
            profileImage: picture,
            isConfirmed:email_verified,
            provider: ProviderEnum.google
        });
    }
    if(user.provider === ProviderEnum.system){
        throw new Error("login with system account first");
    }
    const access_token = jwt.sign({ userId: user._id, email: user.email }, "fam1", {
        expiresIn: 60 * 5,
       
    });

    const refresh_token = jwt.sign({ userId: user._id, email: user.email }, "fam123");

    return res.status(200).json({
        message: "success",
        access_token,
        refresh_token
        
    });
    
};

    


    


export const signin = async (req, res,next) => {
    const { email, password } = req.body;
    const user = await dbservice.findOne({
        model: userModel,
        filter: { email: email.toLowerCase(), provider: "system" }
    });


    if (!user) {
        throw new Error("email not found");
    }

    if (!(await compare(password, user.password))) {
        throw new Error("invalid password");
    }

    const access_token = jwt.sign({ userId: user._id, email: user.email }, "fam1", {
        expiresIn: 60 * 5,
        audience: "http://localhost:4000",
        issuer: "http://localhost:3000",
        notBefore: 30,
        noTimestamp: true,
        
    });


    const refresh_token = jwt.sign({ userId: user._id, email: user.email }, "fam123");

    return res.status(200).json({
        message: "success",
        user: { ...user._doc, phone: Decrypt(user.phone) },
        access_token,
        refresh_token,
    });
    
};

export const getprofile = async (req, res,next) => {

    if (!req.user) {
        throw new Error("user not found", { cause: 401 });
    }

    return res.status(200).json({
        message: "success",
        user: req.user,
    });
};
