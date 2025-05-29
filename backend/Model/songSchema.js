const mongoose = require('mongoose')
const Artist = require('./artistSchema')
const Album = require('./albumSchema')

const songSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    artist: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Artist',
        required: true
    },
    album: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Album',
        required: false
    },
    length: {
        type: Number,
        required: true,
        min: 0
    }
})

module.exports = mongoose.model('Song', songSchema)