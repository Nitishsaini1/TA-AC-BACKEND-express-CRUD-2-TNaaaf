const express = require('express');
const router = express.Router();
const Book = require('../models/book');
const Author = require('../models/author');
const multer = require('multer');
const path = require('path');

// Set up multer for file uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({ storage: storage });

router.get('/', async (req, res) => {
    try {
        const books = await Book.find().populate('author');
        res.render('books/index', { books });
    } catch (err) {
        res.status(500).send(err.message);
    }
});

router.get('/new', async (req, res) => {
    try {
        const authors = await Author.find();
        res.render('books/new', { authors });
    } catch (err) {
        res.status(500).send(err.message);
    }
});

router.post('/', upload.single('cover_image'), async (req, res) => {
    try {
        const book = new Book({
            title: req.body.title,
            summary: req.body.summary,
            pages: req.body.pages,
            publication: req.body.publication,
            cover_image: req.file ? req.file.path : '',
            categories: req.body.categories,
            author: req.body.author
        });
        await book.save();
        res.redirect('/books');
    } catch (err) {
        res.status(500).send(err.message);
    }
});

router.get('/:id', async (req, res) => {
    try {
        const book = await Book.findById(req.params.id).populate('author');
        res.render('books/show', { book });
    } catch (err) {
        res.status(500).send(err.message);
    }
});

router.get('/:id/edit', async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);
        const authors = await Author.find();
        res.render('books/edit', { book, authors });
    } catch (err) {
        res.status(500).send(err.message);
    }
});

router.post('/:id', upload.single('cover_image'), async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);
        if (!book) return res.status(404).send('Book not found');

        book.title = req.body.title;
        book.summary = req.body.summary;
        book.pages = req.body.pages;
        book.publication = req.body.publication;
        book.cover_image = req.file ? req.file.path : book.cover_image;
        book.categories = req.body.categories;
        book.author = req.body.author;

        await book.save();
        res.redirect(`/books/${book._id}`);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

router.post('/:id/delete', async (req, res) => {
    try {
        await Book.findByIdAndDelete(req.params.id);
        res.redirect('/books');
    } catch (err) {
        res.status(500).send(err.message);
    }
});

module.exports = router;
