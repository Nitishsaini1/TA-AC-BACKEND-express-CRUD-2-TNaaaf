const mongoose = require('mongoose');

const authorSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    country: { type: String, required: true }
});

const Author = mongoose.model('Author', authorSchema);
module.exports = Author;
