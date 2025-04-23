const mongoose = require('mongoose')
const Artist = require('../Model/artistSchema')

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
    }
}

module.exports = artistController