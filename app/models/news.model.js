const mongoose = require('mongoose');

const NewsSchema = mongoose.Schema({
    title: String,
    content: String
}, {
    timestamps: true
});

module.exports = mongoose.model('News',NewsSchema);