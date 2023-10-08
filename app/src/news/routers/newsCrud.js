const express = require("express");
const newsRepo = require("../repository/newsRepo");

const router = express.Router();

router.get("/", async (req, res) => {
    res.json(await newsRepo.getAllArticles());
});

// Create a new news article
router.post("/", async (req, res) => {
    res.json(await newsRepo.create(req.body));
});

// Get a specific news article by ID
router.get("/:id", async (req, res) => {
    try {
        console.log(req.params.id);
        const article = await newsRepo.getById(req.params.id);
        console.log(article);
        if (!article) {
            res.status(404).send("Article not found");
        } else {
            res.status(200).json(article);
        }
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});

// Update a news article by ID
router.put("/:id", async (req, res) => {
    try {
        const updatedArticle = await ArticleModel.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if (!updatedArticle) {
            res.status(404).send("Article not found");
        } else {
            res.status(200).json(updatedArticle);
        }
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});

// Delete a news article by ID
router.delete("/:id", async (req, res) => {
    try {
        const deletedArticle = await ArticleModel.findByIdAndRemove(
            req.params.id
        );
        if (!deletedArticle) {
            res.status(404).send("Article not found");
        } else {
            res.status(204).send();
        }
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});

module.exports = router;
