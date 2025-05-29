const express = require('express')
const playlistController = require('../Controller/playlistController')
const authenticationMiddleware = require("../Auth/AuthenticationMiddleware");
const authorizationMiddleware = require('../Auth/AuthorizationMiddleware')

const router = express.Router()

router.post('/create',authenticationMiddleware,playlistController.create)

module.exports = router