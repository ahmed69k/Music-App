const mongoose = require('mongoose')
const albumSchema = require('../Model/albumSchema')

const albumController = {
    create: async(req,res) => {
        try{
            const{title, artist, releaseDate, songs} = req.body
            const newAlbum = new album({
                title,
                artist,
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
    }
}

module.exports = albumController