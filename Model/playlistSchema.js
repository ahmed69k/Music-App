const mongoose = require('mongoose')
const song = require('./songSchema')

const playlistSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    songs: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Song',
        required: true
    }],
    createdAt: {
        type: Date,
        default: Date.now
    },
    picture: {
        type: String,
        required: false
    }
})

module.exports = mongoose.model('Playlist', playlistSchema)