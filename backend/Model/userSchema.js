const mongoose = require('mongoose');
const Playlist = require('./playlistSchema.js')

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    profilePicture:{
        type: String,
        default: '',
        required: false
    },
    playlists: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Playlist',
        required: false,

    }],
    creationDate:{
        type:Date,
        default: Date.now
    }
    
})
module.exports = mongoose.model('User', userSchema)



