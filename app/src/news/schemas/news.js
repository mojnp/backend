const mongoose = require('mongoose')

const articleSchema = new mongoose.Schema({
  id: Number,
  title: String,
  description: String,
  author: String,
  link: String,
  linkId: String,
  published: String,
  image: String,
  summary: String,
  content: String
})

const ArticleModel = mongoose.model('Article', articleSchema)

module.exports = ArticleModel
