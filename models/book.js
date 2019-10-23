const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const pageSchema = require('./page');



const bookSchema = new Schema({
    _id: {
        type: String,
        required: true,
        unique: true,
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
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }
})

// const Book = mongoose.model('Book', bookSchema);

module.exports = bookSchema;