const path = require('path');
const fs = require('fs/promises');
const { User } = require('../../models/user');

const avatarsDir = path.join(__dirname, "../", "public", 'avatars')

const updateAvatar = async (req, res) => {
    const { _id } = req.user;
    const { path: tempUpload, originalname } = req.file; 
    const fileName = `${_id}_${originalname}`;
    const resultUpload = path.join(avatarsDir, fileName);
    await fs.rename(tempUpload, resultUpload);
    const avatarUrl = path.join('avatars', fileName);
    await User.findByIdAndUpdate(_id, {avatarUrl})
    
    res.json({
        avatarUrl,
    })
}

module.exports = updateAvatar;