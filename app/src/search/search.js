const express = require('express')
const searchRouterMain = require('./routers/searchRouter')

const searchRouter = express.Router()

searchRouter.use('/', searchRouterMain)

module.exports = searchRouter
