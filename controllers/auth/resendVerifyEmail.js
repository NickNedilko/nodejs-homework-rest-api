const { User } = require("../../models/user");
const { HttpError, sendEmail } = require("../../utils");
require("dotenv").config();

const resendVerifyEmail = async (req, res) => {
    const { email } = req.body;
    const user = await User.findOne({ email});
    if (!user) {
        throw HttpError(400, "missing required field email")
    }
    if (user.verify) {
        throw HttpError(400, "Verification has already been passed")
    }

  const {BASE_URL}= process.env;
     const verifyEmail = {
        to: email,
        subject: "Verify email",
        html: `<a target='_Blank' href='${BASE_URL}/api/auth/verify/${user.verificationToken}'></a>`
    }

    await sendEmail(verifyEmail);
    res.status(200).json({
    message: "Verification email sent"
})

}


module.exports = resendVerifyEmail;