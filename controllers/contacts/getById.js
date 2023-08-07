const { HttpError} = require("../../utils");

const { Contact } = require('../../models/contact');



const getById = async (req, res) => {
    const { id } = req.params;
    // const result = await Book.findOne({_id: id})
    const result = await Contact.findById(id);
    if (!result) {
        throw HttpError(404, "Not found");
    }
    res.json(result);
}

module.exports = getById