const { ctrlWrapper } = require("../../utils");

const register = require('./register');
const login = require('./login');
const current = require('./current');
const logout = require('./logout');
const updateAvatar = require('./updateAvatar')



module.exports = {
    register: ctrlWrapper(register),
    login: ctrlWrapper(login),
    current: ctrlWrapper(current),
    logout: ctrlWrapper(logout),
    updateAvatar: ctrlWrapper(updateAvatar)
}