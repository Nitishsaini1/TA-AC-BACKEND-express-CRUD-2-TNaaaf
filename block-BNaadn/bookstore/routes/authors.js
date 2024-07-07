const express = require('express');
const router = express.Router();
const Author = require('../models/author');

router.get('/', async (req, res) => {
    try {
        const authors = await Author.find();
        res.render('authors/index', { authors });
    } catch (err) {
        res.status(500).send(err.message);
    }
});

router.get('/new', (req, res) => {
    res.render('authors/new');
});

router.post('/', async (req, res) => {
    try {
        const author = new Author(req.body);
        await author.save();
        res.redirect('/authors');
    } catch (err) {
        res.status(500).send(err.message);
    }
});

router.get('/:id', async (req, res) => {
    try {
        const author = await Author.findById(req.params.id).populate('books');
        res.render('authors/show', { author });
    } catch (err) {
        res.status(500).send(err.message);
    }
});

router.get('/:id/edit', async (req, res) => {
    try {
        const author = await Author.findById(req.params.id);
        res.render('authors/edit', { author });
    } catch (err) {
        res.status(500).send(err.message);
    }
});

router.post('/:id', async (req, res) => {
    try {
        const author = await Author.findById(req.params.id);
        if (!author) return res.status(404).send('Author not found');

        author.name = req.body.name;
        author.email = req.body.email;
        author.country = req.body.country;

        await author.save();
        res.redirect(`/authors/${author._id}`);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

router.post('/:id/delete', async (req, res) => {
    try {
        await Author.findByIdAndDelete(req.params.id);
        res.redirect('/authors');
    } catch (err) {
        res.status(500).send(err.message);
    }
});

module.exports = router;

