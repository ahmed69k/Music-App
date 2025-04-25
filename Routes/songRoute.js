const express = require('express')
const mongoose = require('mongoose')
const songController = require("../Controller/songController")

const router = express.Router()

router.post('/create',songController.create)
router.get('/getSong/:title',songController.getSong)
router.get('/getSongs/', songController.getSongs)
router.put('/update/:title', songController.update)
router.delete('/delete/:title', songController.delete)

module.exports = router