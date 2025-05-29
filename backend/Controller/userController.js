const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config()

const secretKey = process.env.SECRET_KEY
const currentDateTime = Date.now

const userSchema = require('../Model/userSchema');
const playlistSchema = require('../Model/playlistSchema');

const userController = {

    create: async(req,res) =>{
       try{
        const {email,password,name,profilePicture} = req.body
        const existingUser = await userSchema.findOne({email:email})
        if(existingUser){
            return res.status(500).json({message:"User already exists!"})
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await userSchema.create({
            name: name,
            email: email,
            password:hashedPassword,
            profilePicture: profilePicture
        })
        return res.status(200).json({message:"User created successfully!", user})
       }
       catch(e){
        console.log(e)
        return res.status(500).json({message:"Server error while creating user!"})
       } 
    },
    login: async(req,res) =>{
        try{
            const {email,password} = req.body
            const user = await userSchema.findOne({email:email})
            if(!user){
                return res.status(404).json({message:"User not found!"})
            }
            const passwordMatch = await bcrypt.compare(password, user.password);
            if(!passwordMatch){
                return res.status(403).json({message:"Password is incorrect!"})
            }
            const expiresIn = new Date(Date.now() + 30 * 60 * 1000);
            const token = jwt.sign(
                { user: { userId: user._id, role: user.role } },
                secretKey,
                {
                expiresIn: 3 * 60 * 60, // 3 hours token expiry
                }
            );
            return res
            .cookie("token",token,{
                expires: expiresIn,
                httpOnly:true,
                secure:true,
                sameSite:"none"
            }).status(200).json({message:"Logged in successfully",user,token})
        }
        catch(e){
            console.log(e)
            return res.status(500).json({message:"Server error while trying to log in!"})
        }
        
    }
}
module.exports = userController;