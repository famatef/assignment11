import{hash} from "../../common/security/hash.js";
import {generate_otp,sendEmail} from "../../common/service/sendEmail.js";
import {getValue,setValue,ttl,incr} from "../../DB/service/redis.service.js";
import {eventEmitter} from "../../common/utils/events.js";
import userModel from "../../DB/models/user.model.js";
import emailTemplate from "../../common/utils/email.templete.js";



export const sendEmailOtp = async ({email,isConfirmed = false} = {}) => {
    const isBlocked = await ttl(`otp::block::${email}`)
    if(isBlocked>0){
        throw new Error(`you are blocked, you can resend OTP after ${isBlocked} seconds`)
    }
    const ttlOtp = await ttl(`otp::${email}`)
    if(ttlOtp>0){
        throw new Error(`otp already sent ,you can reSend otp after ${ttlOtp} seconds`)
    }
    const max_otp = await getValue(`otp::max::${email}`)
    if(max_otp>=3){
        await setValue({
                key:`otp::block::${email}`,
            value:1,
            ttl:5 * 60
        })
        throw new Error(`max otp send limit reached`)
    }
    const user = await userModel.findOne({ email: email.toLowerCase(),
        isConfirmed
     });
     if (!user) {
        throw new Error("email not found");
    }
    const otp = await generate_otp();
    const otpHash = await hash(otp,12);
    await setValue({
        key:`otp::${email}`,
        value:otpHash,
        ttl:5 * 60
    })
    eventEmitter.emit("confirm_email",async ()=>{
      await sendEmail({
        to:email,
        subject:"Confirm your email",
        html: emailTemplate(otp, user.fname)
    })
    })
    await incr(`otp::max::${email}`)
}
