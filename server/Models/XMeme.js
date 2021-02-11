const mongoose = require('mongoose');

const MemeSchema = mongoose.Schema({
    id: {
        type: String,
        required: true,
        unique: true,
    },
    name: {
        type: String,
        required: true,
    },
    caption: {
        type: String,
        required: true,
    },
    url: {
        type: String,
        required: true,
    }
})

module.exports = mongoose.model('XMeme', MemeSchema);