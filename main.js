require('dotenv').config()
const express = require('express')

const usersRouter = require('./app/src/users/users')
const newsRouter = require('./app/src/news/news')
const searchRouter = require('./app/src/search/search')

const app = express()
const PORT = 8080

app.use(express.json())
app.use('/news', newsRouter)
app.use('/users', usersRouter)
app.use('/search', searchRouter)

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`)
})
