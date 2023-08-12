const Jimp = require('jimp')
const path = require('path');
const fs = require('fs/promises');
const { User } = require('../../models/user');



const avatarsDir = path.join(__dirname, "../", "../" ,"public", 'avatars')

const updateAvatar = async (req, res) => {
    const { _id } = req.user;
    const { path: tempUpload, originalname } = req.file; 
    const fileName = `${_id}_${originalname}`;
    const resultUpload = path.join(avatarsDir, fileName);
      Jimp.read(tempUpload, (err, image) => {
      if (err) throw err;
      image.resize(250, 250).quality(60).write(resultUpload);
    });
    await fs.rename(tempUpload, resultUpload);
    const avatarUrl = path.join('avatars', fileName);
    await User.findByIdAndUpdate(_id, {avatarUrl})
    
    res.status(201).json({
        avatarUrl,
    })
}

module.exports = updateAvatar;