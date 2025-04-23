const express = require('express')
const artistController = require('../Controller/artistController')

const router = express.Router()

router.post('/create', artistController.create)

module.exports = router