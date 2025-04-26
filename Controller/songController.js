const mongoose = require('mongoose')
require('dotenv').config()
const Artist = require('../Model/artistSchema')
const songSchema = require('../Model/songSchema')
const albumSchema = require('../Model/albumSchema')
const artistSchema = require('../Model/artistSchema')

//CRUD complete

const songController = {

    create: async (req,res) => {
        try{
            const {title,artist,album, length} = req.body
            const artistDoc = await artistSchema.findOne({name:artist})
            const albumDoc = await albumSchema.findOne({title: album})
            const artistId = artistDoc._id
            const albumId = albumDoc._id
            const newSong = 
            new songSchema({
                title,
                artist:artistId,
                album:albumId,
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
            const title = req.params.title
            const song = await songSchema.findOne({title: title,}).
            populate('artist','name').
            populate('album','title')
            if (!song) {
                return res.status(404).json({ message: title + " not found!" });
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
    },
    getSongs: async(req,res) => {
        try{
            const songs = await songSchema.find()
            if(!songs){
                return res.status(500).json({message: "No songs found!"})
            }
            return res.status(200).json(songs)
        }
        catch(e){
            console.log(e)
            return res.status(500).json({message: "Server Error!"})
        }
    },
    update: async(req,res) => {
        try{
            const title = req.params.title
            const {newTitle, newArtist, newAlbum,newLength} = req.body
            const song = await songSchema.findOne({title:title})
            if(!song){
                return res.status(500).json({message: "Could not find song!"})
            }
            if(newTitle)
                song.title = newTitle
            
            if(newArtist) {
                const artistDoc = await artistSchema.findOne({name:newArtist})
                if(!artistDoc){
                    return res.status(500).json({message: "Artist not found!"})
                }
                song.artist = artistDoc._id
            }
                
            if(newAlbum) {
                const albumDoc = await albumSchema.findOne({title:newAlbum})
                if(!albumDoc){
                    return res.status(500).json({message: "Album not found!"})
                }
                song.album = albumDoc._id
            }
                
            if(newLength) 
                song.length = newLength
            await song.save()
            return res.status(200).json({song})
        }
        catch(e){
            console.log(e)
            return res.status(500).json({message: "Server Error!"})
        }
    },
    delete: async(req,res) => {
        try{
            const title = req.params.title
            const song = await songSchema.findOneAndDelete({title:title})
            if(!song){
                return res.status(500).json({message: "Song not found!"})
            }
            return res.status(200).json({message : "Song deleted successfully!"})
        }
        catch(e){
            console.log(e)
            return res.status(500).json({message: "Server Error!"})
        }
    }

}

module.exports = songController;