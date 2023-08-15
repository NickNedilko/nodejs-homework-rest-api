const { HttpError} = require("../../utils");
const { Contact } = require('../../models/contact');



const updateFavorite = async (req, res) => {
    const { id } = req.params;
    const result = await Contact.findByIdAndUpdate(id, req.body, {new: true});
    if (!result) {
        throw HttpError(404, "missing field favorite");
    }
    res.json(result);
}

module.exports = updateFavorite;