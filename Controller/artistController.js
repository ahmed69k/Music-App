const mongoose = require('mongoose')
const artistSchema = require('../Model/artistSchema')

//CRUD complete 

const artistController = {
    create: async(req,res) => {
        try{
            const {name,profilePicture,description} = req.body
            const newArtist = new Artist({
                name,
                profilePicture,
                description
            })
            await newArtist.save()
            return res.status(200).json({message:"Artist created successfully!"})
        }
        catch(e){
            console.log(e)
            return res.status(500).json({message:"Error creating artist!"})
        }
    },
    getArtists: async(req,res)=> {
        try{
            const artists = await artistSchema.find();
            if(!artists){
                return res.status(500).json({message: "No Artists Found!"})
            }
            return res.status(200).json(artists)
        }
        catch(e){
            console.log(e)
            return res.status(500).json({message:"Server Error!"})
        }
    },
    getArtist: async(req,res) => {
        try{
            const name = req.params.name
            const artist = await artistSchema.findOne({name: name})
            if(!artist){
                return res.status(500).json({message: "Could not find artist!"})
            }
            return res.status(200).json(artist)
        }
        catch(e){
            console.log(e)
            return res.status(500).json({message: "Server Error"})
        }
    },
    update: async(req,res) => {
        try{
            const name = req.params.name
            const {newName, newDesc, newPfp} = req.body
            const artist = await artistSchema.findOne({name:name})
            if(!artist){
                return res.status(500).json({message: "Could not find artist!"})
            }
            if(newName){
                artist.name = newName
            }
            if(newDesc){
                artist.description = newDesc
            }
            if(newPfp){
                artist.profilePicture = newPfp
            }
            artist.save()
            return res.status(200).json({message: "Updated successfully!", artist})
        }
        catch(e){
            console.log(e)
            return res.status(500).json({message: "Server Error"})
        }
    },
    delete: async(req,res)=> {
        try{
            const name = req.params.name
            const artist = await artistSchema.findOneAndDelete({name:name})
            return res.status(200).json({message: "Artist deleted successfully!"})
        }
        catch(e){
            console.log(e)
            return res.status(500).json({message: 'Server Error!'})
        }
    }
    
}


module.exports = artistController