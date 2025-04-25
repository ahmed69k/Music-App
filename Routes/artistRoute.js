const express = require('express')
const artistController = require('../Controller/artistController')

const router = express.Router()

router.post('/create', artistController.create)
router.get('/getAll', artistController.getArtists)
router.get('/get/:name', artistController.getArtist)
router.put("/update/:name", artistController.update)
router.delete('/delete/:name', artistController.delete)

module.exports = router