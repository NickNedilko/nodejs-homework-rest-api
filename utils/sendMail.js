const nodemailer = require('nodemailer') 

require('dotenv').config();

const {META_PASSWORD}= process.env;

const nodemailerConfig = {
    host: 'smtp.meta.ua',
    port: 465, 
    secure: true,
    auth: {
        user: "mykolanedilkoit@meta.ua",
        pass: META_PASSWORD
    }
}

const transport = nodemailer.createTransport(nodemailerConfig);

const sendEmail = async (data) => {
    const email = { ...data, from: "mykolanedilkoit@meta.ua" };
    await transport.sendEmail(email);
    return true;
}


module.exports = sendEmail;