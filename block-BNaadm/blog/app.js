const express = require('express');
const mongoose = require('mongoose');
const methodOverride = require('method-override');

const app = express();

// Connect to MongoDB
mongoose.connect('mongodb://localhost/blog', { useNewUrlParser: true, useUnifiedTopology: true });

// Set view engine
app.set('view engine', 'ejs');

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method'));

// Routes
const articleRouter = require('./routes/articles');
const commentRouter = require('./routes/comments');

app.use('/articles', articleRouter);
app.use('/comments', commentRouter);

// Start the server
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
