const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema({
    title: String,
    description: String,
    tags: [String],
    author: String,
    likes: { type: Number, default: 0 }
});

module.exports = mongoose.model('Article', articleSchema);
