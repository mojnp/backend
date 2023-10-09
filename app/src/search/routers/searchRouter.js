const express = require("express");
const { search } = require("../services/searchService");

const searchRouterMain = express.Router();

searchRouterMain.get("/:search_term", async (req, res) => {
    try {
        const result = await search(req.params.search_term);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
});

module.exports = searchRouterMain;
