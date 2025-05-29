const mongoose = require('mongoose')
const express = require('express')
require('dotenv').config()

const songSchema = require('../Model/songSchema')
const albumSchma = require('../Model/albumSchema')
const artistSchema = require('../Model/artistSchema')
const playlistSchema = require('../Model/playlistSchema')
const User = require('../Model/userSchema.js')

const playlistController = {
    create: async(req,res) => {
        try{
            const userId = req.user.userId
            if(!userId){
                return res.status(404).json({message: "User not found. Are you logged in?"})
            }
            const {name, songs, createdAt, picture, creator} = req.body
            const playlist = await playlistSchema.create({
                name: name,
                songs : songs,
                createdAt,
                picture,
                creator: userId,
            })
            return res.status(200).json({playlist})
        }
        catch(e){
            console.log(e)
            return res.status(500).json({message: "Server Error!"})
        }
    },
    getPlaylist: async(req,res) => {
        try{
            const id = req.params.id
            const playlistName = req.body.name
            const foundPlaylist = await playlistSchema.findOne({name:playlistName})
            if(!foundPlaylist){
                return res.status(500).json({message: "Could not find playlist!"})
            }
            return res.status(200).json({message:"Playlist created successfully!", playlist})
        }
        catch(e){
            console.log(e)
            return res.status(500).json({message: "Server Error in Playlist getter"})
        }
    },
    getPlaylists: async(req,res) => {
        try{
            const userId = req.user.userId;
            const playlists = await playlistSchema.findOne({creator: userId})
            if(!playlists){
                return res.status(404).json({message: "No playlists found. Did you create any?"})
            }
            return res.status(200).json(playlists)
        }
        catch(e){
            console.log(e)
            return res.status(500).json({message: "Error getting user playlists!"})
        }
    }
}

module.exports = playlistController