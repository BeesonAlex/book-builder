const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const pageSchema = require('./page');



const bookSchema = new Schema({
    _id: {
        type: String,
        required: true,
    },
    authorId: {
        type: String,
        required: true,
    },
    author: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,

    },
    numberOfPages: {
        type: Number,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    contentUrl: {
        type: String,
        required: false,
    },
    coverUrl: {
        type: String,
        required: false,
    },
    pages: [pageSchema],
})

// const Book = mongoose.model('Book', bookSchema);

module.exports = bookSchema;