const LRUCache = require('lru-cache')
const { connectToDb } = require('../../../database/db')

const newsCache = new LRUCache(1000)

const searchItem = (item, searchTerm) => {
  const searchFields = [
    'name',
    'title',
    'description',
    'author',
    'summary',
    'category'
  ]

  const results = searchFields.map((key) => {
    return item[key] && item[key].toLowerCase().includes(searchTerm)
  })

  return results.includes(true) ? item : false
}

const searchAndAppend = (results, items, searchTerm) => {
  items.forEach((item) => {
    if (searchItem(item, searchTerm)) {
      results.push(item)
    }
  })
}

const search = async (searchTerm) => {
  console.log(searchTerm)
  if (newsCache.has(searchTerm)) {
    return newsCache.get(searchTerm)
  }

  try {
    const newsCollection = connectToDb('news')
    const tourismCollection = connectToDb('tourism')

    const results = []

    const [newsItems, tourismItems] = await Promise.all([
      newsCollection.find({}).toArray(),
      tourismCollection.find({}).toArray()
    ])

    searchAndAppend(results, newsItems, searchTerm)
    searchAndAppend(results, tourismItems, searchTerm)

    newsCache.set(searchTerm, results)
    return results
  } catch (error) {
    console.error(error)
    throw new Error('Error searching for items')
  }
}

module.exports = { search }
