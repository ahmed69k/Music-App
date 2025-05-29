const express = require('express')
const artistController = require('../Controller/artistController')

const router = express.Router()

router.post('/', artistController.create)
router.get('/', artistController.getArtists)
router.get('/:name', artistController.getArtist)
router.put("/:name", artistController.update)
router.delete('/:name', artistController.delete)

module.exports = router