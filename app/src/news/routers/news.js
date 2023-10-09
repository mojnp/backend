const express = require('express')
const { writeToDb } = require('../helpers/feed') // Replace with the correct path

const currentUrls = [
  'https://rtvnp.rs/feed/',
  'https://sandzakpress.net/feed/',
  'https://sandzakhaber.net/feed/',
  'https://www.sandzakdanas.rs/feed'
]

const router = express.Router()

// Define a route for generating news
router.post('/generate', async (req, res) => {
  try {
    await writeToDb(currentUrls)
    res.status(201).send('News generated successfully')
  } catch (error) {
    console.error(error)
    res.status(500).send('Internal Server Error')
  }
})


cron.schedule("* * * * *", async () => {
    try {
        await writeToDb(currentUrls);
        console.log("News updated");
    } catch (error) {
        console.error("Error updating news:", error);
    }
});

module.exports = router
