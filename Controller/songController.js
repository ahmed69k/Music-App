const mongoose = require('mongoose')
require('dotenv').config()
const Artist = require('../Model/artistSchema')
const Song = require('../Model/songSchema')
const albumSchema = require('../Model/albumSchema')

const songController = {

    create: async (req,res) => {
        try{
            const {title,artist,album, length} = req.body
            const newSong = 
            new Song({
                title,
                artist,
                album,
                length
            })
            await newSong.save()
            return res.status(200).json({
                message: 'Song Created Successfully!',
                song: newSong
            })
        }
        catch(e){
            console.log(e)
            return res.status(500).json({
                message: 'Server Error!'
            })
        }

    },
    getSong: async (req,res) => {
        try{
            const name = req.body.title
            const song = await Song.findOne({title: name,}).populate('artist','name').populate('song','name')
            if (!song) {
                return res.status(404).json({ message: name + " not found!" });
            }
            song.artist = song.artist.name;
            return res.status(200).json({ song });
        }
        catch(e){
            console.log(e)
            return res.status(500).json({
                message: "Server Error :("
            })
        }
        

    }

}

module.exports = songController;