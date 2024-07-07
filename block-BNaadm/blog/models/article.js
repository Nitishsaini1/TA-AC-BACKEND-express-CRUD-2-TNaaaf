const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const articleSchema = new Schema({
    title: String,
    description: String,
    tags: [String],
    author: String,
    likes: { type: Number, default: 0 },
    comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }]
});

articleSchema.pre('remove', async function(next) {
    await this.model('Comment').deleteMany({ articleId: this._id });
    next();
});

module.exports = mongoose.model('Article', articleSchema);
