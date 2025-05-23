const mongoose = require('mongoose')
const albumSchema = require('../Model/albumSchema')
const artistSchema = require('../Model/artistSchema')

//CRUD comeplete

const albumController = {
    create: async(req,res) => {
        try{
            const{title, artist, releaseDate, songs} = req.body
            const artistDoc = await artistSchema.findOne({name:artist})
            if(!artistDoc){
                return res.status(500).json({message: "Artist Not Found!", artistDoc})
            }
            const artistId = artistDoc._id
            const newAlbum = new albumSchema({
                title,
                artist:artistId,
                releaseDate,
                songs
            })
            await newAlbum.save()
            return res.status(200).json({message:"Album created successfully!"})
        }
        catch(e){
            console.log(e)
            return res.status(500).json({
                message: "Error creating album!"
            })
        }
    },
    getAlbum: async (req, res) => {
        try {
            const name = req.params.title
            const album = await albumSchema.findOne({ title: name }).populate('artist', 'name').populate('songs', 'title'); 

            if (!album) {
                return res.status(404).json({ message: name + " not found!" });
            }

            return res.status(200).json({ album });
        } catch (e) {
            console.log(e);
            return res.status(500).json({
                message: "Server Error :("
            });
        }
    },
    getAlbums: async(req,res) => {
        try{ 
            const albums = await albumSchema.find().populate('artist','name').populate('songs','title')
            if(!albums){
                return res.status(500).json({message: "No albums found!"})
            }
            return res.status(200).json({albums})
        }
        catch(e){
            console.log(e)
            return res.status(500).json({message: "Server Error!"})
        }

    },
    delete: async (req, res) => {
        try{
            const title = req.params.title
            const album = await albumSchema.findOneAndDelete({title: title})
            if(!album){
                return res.status(500).json({message: "Album not found!"})
            }
            
            return res.status(200).json({message: "Album deleted successfully!"})
        }
        catch(e){
            console.log(e)
            return res.status(500).json({
                message: "Server Error!"
            })
        }
    },
    update: async(req,res) => {
        try{
            const title = req.params.title
        const {newTitle, newArtist, newReleaseDate, newSongs} = req.body
        const album = await albumSchema.findOne({title:title})
        if(!album){
            return res.status(500).json({message: "Could not find album!"})
        }
        if(newTitle){
            album.title = newTitle;
        }
        if(newArtist){
            album.artist = newArtist
        }
        if(newReleaseDate){
            album.releaseDate = newReleaseDate
        }
        if(newSongs){
            album.songs = newSongs
        }
        return res.status(200).json({message: "Albm Updated Successfully!", album})
        }
        catch(e){
            console.log(e)
            return res.status(500).json({message: "Server Error!"})
        }
    }
}

module.exports = albumController