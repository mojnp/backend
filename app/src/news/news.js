const express = require('express')
const newsRouter = require('./routers/news')
const newsCrudRouter = require('./routers/newsCrud')

const newsRouterMain = express.Router()

newsRouterMain.use('/', newsRouter)
newsRouterMain.use('/', newsCrudRouter)

module.exports = newsRouterMain
