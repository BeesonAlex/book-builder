const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const pageSchema = new Schema({
    _id: {
        type: String,
        required: true,
    },
    pageNumber: {
        type: Number,
        required: true,
    },
    track: {
        type: String,
        required: true,
    },
    albumArt: {
        type: String,
        required: true,
    },
    artist: {
        type: String,
        required: true,
    },
    thoughts: {
        type: String,
        required: false,
    },
    pageContentUrl: {
        type: String,
        required: false,
    },
})

// const Page = mongoose.model('Page', pageSchema);

module.exports = pageSchema;