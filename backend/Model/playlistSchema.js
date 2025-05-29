const mongoose = require('mongoose')
const Song = require('./songSchema.js')
const User = require('./userSchema.js')

const playlistSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    songs: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Song',
        required: false
    }],
    createdAt: {
        type: Date,
        default: Date.now
    },
    picture: {
        type: String,
        required: false
    },
    creator:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        
    }
})

module.exports = mongoose.model('Playlist', playlistSchema)