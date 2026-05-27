const express = require("express");

const createEmbedding = require("../services/embeddingService");

const getCollection = require("../services/chromaService");

const generateAnswer = require("../services/chatService");

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { question } = req.body;

    const embedding = await createEmbedding(question);

    const collection = await getCollection();

    const results = await collection.query({
      queryEmbeddings: [embedding],
      nResults: 3,
    });

    const documents = results.documents[0];

    const metadatas = results.metadatas[0];

    const context = documents.join("\n\n");

    const answer = await generateAnswer(question, context);

    const sources = [
      ...new Set(metadatas.map((item) => item.source)),
    ];

    res.json({
      answer,
      sources,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Chat failed",
    });
  }
});

module.exports = router;