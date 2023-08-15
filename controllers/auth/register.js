const bcrypt = require('bcrypt');
const gravatar = require('gravatar');
const nanoid = require('nanoid')
require("dotenv").config()


const { User } = require("../../models/user");
const { HttpError, sendEmail} = require("../../utils");


const register = async (req, res) => {

    const { email, password } = req.body;
    const user = await User.findOne({ email });
   
    if (user) {
        throw HttpError(409, `Such email is exist, try another one`)
    }
    const hashPassword = await bcrypt.hash(password, 10)

    const avatarUrl = gravatar.url(email);
    const verificationToken = nanoid();

    const newUser = await User.create({ ...req.body, password: hashPassword, verificationToken, avatarUrl });
    const {BASE_URL}= process.env;
    const verifyEmail = {
        to: email,
        subject: "Verify email",
        html: `<a target='_Blank' href='${BASE_URL}/api/auth/verify/${verificationToken}'></a>`
    }
    await sendEmail(verifyEmail);

    res.status(201).json({
        email: newUser.email,
        subscription: newUser.subscription
        
    });
}


module.exports = register;