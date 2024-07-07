const express = require('express');
const router = express.Router();
const Article = require('../models/article');
const Comment = require('../models/comment');

// List all articles
router.get('/', async (req, res) => {
    const articles = await Article.find();
    res.render('articles/index', { articles });
});

// Article create form
router.get('/new', (req, res) => {
    res.render('articles/new', { article: new Article() });
});

// Create new article
router.post('/', async (req, res) => {
    const article = new Article({
        title: req.body.title,
        description: req.body.description,
        tags: req.body.tags.split(','),
        author: req.body.author
    });
    try {
        await article.save();
        res.redirect(`/articles/${article.id}`);
    } catch (e) {
        res.render('articles/new', { article });
    }
});

// Show article details
router.get('/:id', async (req, res) => {
    const article = await Article.findById(req.params.id).populate('comments');
    res.render('articles/show', { article });
});

// Edit article form
router.get('/:id/edit', async (req, res) => {
    const article = await Article.findById(req.params.id);
    res.render('articles/edit', { article });
});

// Update article
router.put('/:id', async (req, res) => {
    let article = await Article.findById(req.params.id);
    article.title = req.body.title;
    article.description = req.body.description;
    article.tags = req.body.tags.split(',');
    article.author = req.body.author;
    try {
        await article.save();
        res.redirect(`/articles/${article.id}`);
    } catch (e) {
        res.render('articles/edit', { article });
    }
});

// Delete article
router.delete('/:id', async (req, res) => {
    const article = await Article.findById(req.params.id);
    await article.remove();
    res.redirect('/articles');
});

// Increment like
router.put('/:id/like', async (req, res) => {
    let article = await Article.findById(req.params.id);
    article.likes += 1;
    await article.save();
    res.redirect(`/articles/${article.id}`);
});

// Decrement like
router.put('/:id/dislike', async (req, res) => {
    let article = await Article.findById(req.params.id);
    article.likes -= 1;
    await article.save();
    res.redirect(`/articles/${article.id}`);
});

module.exports = router;
