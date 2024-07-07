const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    title: { type: String, required: true },
    summary: { type: String, required: true },
    pages: { type: Number, required: true },
    publication: { type: String, required: true },
    cover_image: { type: String }, // URL or path to cover image
    categories: [{ type: String, enum: ['fiction', 'adventure', 'technology', 'motivation'] }],
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'Author', required: true }
});

const Book = mongoose.model('Book', bookSchema);
module.exports = Book;
