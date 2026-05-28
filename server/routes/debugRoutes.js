const express = require("express");

const getCollection = require("../services/chromaService");

const router = express.Router();

router.get("/documents", async (req, res) => {
  try {
    const collection = await getCollection();

    const data = await collection.get();

    const uniqueSources = [
      ...new Set(
        data.metadatas.map((item) => item.source)
      ),
    ];

    res.json({
      totalDocuments: data.ids.length,
      files: uniqueSources,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Failed to fetch documents",
    });
  }
});

module.exports = router;