const express = require("express");

const createEmbedding = require("../services/embeddingService");

const getCollection = require("../services/chromaService");

const generateAnswer = require("../services/chatService");

const router = express.Router();

router.post("/", async (req, res) => {
  console.time("chat-api");

  try {
    const { question } = req.body;

    console.time("embedding");

    const embedding = await createEmbedding(question);

    console.timeEnd("embedding");

    console.time("get-collection");

    const collection = await getCollection();

    console.timeEnd("get-collection");

    console.time("vector-search");

    const results = await collection.query({
      queryEmbeddings: [embedding],
      nResults: 2,
    });

    console.timeEnd("vector-search");

    const documents = results.documents[0];

    const metadatas = results.metadatas[0];

    const context = documents.join("\n\n");

    console.time("llm-answer");

    const answer = await generateAnswer(question, context);

    console.timeEnd("llm-answer");

    const sources = [
      ...new Set(metadatas.map((item) => item.source)),
    ];

    console.timeEnd("chat-api");

    res.json({
      answer,
      sources,
    });
  } catch (error) {
    console.error(error);

    console.timeEnd("chat-api");

    res.status(500).json({
      error: "Chat failed",
    });
  }
});

module.exports = router;