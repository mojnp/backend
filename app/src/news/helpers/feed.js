const cheerio = require('cheerio')
const Parser = require('rss-parser')
const { clearData, createMany } = require('../data_access/news') // Replace with the correct path

const parser = new Parser()

function extractImagesFromContent (content) {
  const $ = cheerio.load(content)
  const images = []

  $('img').each(function () {
    const src = $(this).attr('src')
    if (src && src.endsWith('.jpg') && !src.includes('logo-iz-bijeli')) {
      images.push(src)
    }
  })

  return images
}

function parseTitle (title) {
  const serbianToEnglish = {
    č: 'c',
    ć: 'c',
    š: 's',
    ž: 'z',
    đ: 'd'
  }

  let cleanedTitle = title.toLowerCase()

  for (const [serbianChar, englishChar] of Object.entries(serbianToEnglish)) {
    cleanedTitle = cleanedTitle.replace(
      new RegExp(serbianChar, 'g'),
      englishChar
    )
  }

  cleanedTitle = cleanedTitle.match(/\b\w+\b/g).join('-')
  return cleanedTitle
}

async function extractFeed (url) {
  const feed = await parser.parseURL(url)
  const data = []

  for (const item of feed.items) {
    const images = extractImagesFromContent(item['content:encoded'])
    if (images.length > 0 && images[0].length > 0) {
      const parsedItem = {
        title: item.title,
        link: item.link,
        summary: item.contentSnippet,
        published: item.pubDate.slice(5, 16),
        author: new URL(url).hostname,
        content: item['content:encoded'].replace(/<\/?[^>]+(>|$)/g, ''),
        image: images[0],
        linkId: parseTitle(item.title)
      }
      data.push(parsedItem)
    }
  }

  return data
}

async function writeToDb (urls) {
  clearData()

  for (const url of urls) {
    const data = await extractFeed(url)
    if (data.length > 0) {
      await createMany(data)
    }
  }
}

module.exports = { writeToDb }
