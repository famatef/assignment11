import nodemailer from 'nodemailer';
import { randomInt } from 'crypto';


export const sendEmail = async ({to, subject, html, attachments} = {}) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'famatefatef@gmail.com',
            pass: 'ffsfslupgjvqbezm'
        }
    });

    const info = await transporter.sendMail({
        from: 'famatefatef@gmail.com',
        to,
        subject,
        html: html || '<b>Hello World</b>',
        attachments: attachments || []
    });
    return info.accepted.length > 0;
};
export const generate_otp =() =>{
    return randomInt(100000, 1000000).toString();
}
export default sendEmail;
