const express = require('express')
const mongoose = require('mongoose')
const songController = require("../Controller/songController")

const router = express.Router()

router.post('/',songController.create)
router.get('/:title',songController.getSong)
router.get('/', songController.getSongs)
router.put('/:title', songController.update)
router.delete('/:title', songController.delete)

module.exports = router