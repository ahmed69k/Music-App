const mongoose = require('mongoose')
const song = require('./songSchema')
const album = require('./albumSchema')

const artistSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    profilePicture: {
        type: String,
        required: false
    },
    description:{
        type: String,
        required: false
    }
})

module.exports = mongoose.model('Artist', artistSchema)