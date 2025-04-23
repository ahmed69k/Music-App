const albumController = require('../Controller/albumController')
const express = require('express')
const mongoose = require('mongoose')

const router = express.Router()

router.post('/create', albumController.create)

router.get('/getAlbum/:title', albumController.getAlbum)

module.exports = router