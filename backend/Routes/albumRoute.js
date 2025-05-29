const albumController = require('../Controller/albumController')
const express = require('express')
const mongoose = require('mongoose')

const router = express.Router()

router.post('/', albumController.create)
router.get('/:title', albumController.getAlbum)
router.get('/',albumController.getAlbums)
router.put('/:title',albumController.update)
router.delete('/:title',albumController.delete)

module.exports = router