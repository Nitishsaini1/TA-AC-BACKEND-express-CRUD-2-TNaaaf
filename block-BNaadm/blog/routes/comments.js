const express = require('express');
const router = express.Router();
const Comment = require('../models/comment');
const Article = require('../models/article');

// Create comment
router.post('/:articleId', async (req, res) => {
    try {
        const comment = new Comment({
            content: req.body.content,
            articleId: req.params.articleId,
            author: req.body.author
        });
        await comment.save();
        
        const article = await Article.findById(req.params.articleId);
        article.comments.push(comment);
        await article.save();
        
        res.redirect(`/articles/${req.params.articleId}`);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});

// Edit comment form
router.get('/:id/edit', async (req, res) => {
    const comment = await Comment.findById(req.params.id);
    res.render('comments/edit', { comment });
});

// Update comment
router.put('/:id', async (req, res) => {
    let comment = await Comment.findById(req.params.id);
    comment.content = req.body.content;
    comment.author = req.body.author;
    try {
        await comment.save();
        res.redirect(`/articles/${comment.articleId}`);
    } catch (e) {
        res.render('comments/edit', { comment });
    }
});

// Delete comment
router.delete('/:id', async (req, res) => {
    const comment = await Comment.findById(req.params.id);
    const articleId = comment.articleId;
    await comment.remove();
    res.redirect(`/articles/${articleId}`);
});

// Increment like
router.put('/:id/like', async (req, res) => {
    let comment = await Comment.findById(req.params.id);
    comment.likes += 1;
    await comment.save();
    res.redirect(`/articles/${comment.articleId}`);
});

// Decrement like
router.put('/:id/dislike', async (req, res) => {
    let comment = await Comment.findById(req.params.id);
    comment.likes -= 1;
    await comment.save();
    res.redirect(`/articles/${comment.articleId}`);
});

module.exports = router;
