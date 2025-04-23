const express = require('express')
const mongoose = require('mongoose')
const songController = require("../Controller/songController")

const router = express.Router()

router.post('/create',songController.create)
router.get('/getSong',songController.getSong)

module.exports = router