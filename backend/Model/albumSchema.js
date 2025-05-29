const mongoose = require('mongoose')
const Song = require("./songSchema")
const Artist = require("./artistSchema")

const albumSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    artist: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Artist',
        required: true
    },
    releaseDate: {
        type: Date,
        required: true
    },
    songs: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Song',
        required: true
    }]
})

module.exports = mongoose.model('Album', albumSchema)