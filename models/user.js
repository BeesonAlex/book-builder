const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bookSchema = require('./book')
const pageSchema = require('./page')

const userSchema = new Schema({
    _id: {
        type: String,
        required: true,
        default: '1',
    },
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        default: 'beeson.alexander@gmail.com',
    },
    numberOfBooks: {
        type: Number,
        required: true,
    },
    books: [bookSchema],
    pages: [pageSchema]
})

const User = mongoose.model('User', userSchema);

module.exports = User;