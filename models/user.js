const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bookSchema = require('./book')
const pageSchema = require('./page')

const userSchema = new Schema({
    id: {
        type: String,
        required: true,
        unique: true,
    },
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    books: [],
})

const User = mongoose.model('User', userSchema);

module.exports = User;