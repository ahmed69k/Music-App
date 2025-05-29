const express = require('express')
const userController = require('../Controller/userController')
const authenticationMiddleware = require("../Auth/AuthenticationMiddleware");
const authorizationMiddleware = require('../Auth/AuthorizationMiddleware')

const router = express.Router()

router.post('/register', userController.create)
router.post('/login',userController.login)

module.exports = router;