const express = require("express");

const createEmbedding = require("../services/embeddingService");

const getAgent = require("./agentRouter");

const getCollection = require("../services/chromaService");

const generateAnswer = require("../services/chatService");

const router = express.Router();

router.post("/", async (req, res) => {
  console.time("chat-api");

  try {
    const { question } = req.body;

    // =========================
    // EMBEDDING
    // =========================
    console.time("embedding");

    const embedding = await createEmbedding(question);

    console.timeEnd("embedding");

    // =========================
    // AGENT ROUTING
    // =========================
    const agent = getAgent(question);

    console.log("Selected Agent:", agent);

    // =========================
    // COLLECTION
    // =========================
    console.time("get-collection");

    const collection = await getCollection(agent);

    console.timeEnd("get-collection");

    // =========================
    // VECTOR SEARCH
    // =========================
    console.time("vector-search");

    const results = await collection.query({
      queryEmbeddings: [embedding],
      nResults: 2,
    });

    console.timeEnd("vector-search");

    const documents = results.documents?.[0] || [];

    const metadatas = results.metadatas?.[0] || [];

    // =========================
    // NO RESULTS
    // =========================
    if (!documents.length) {
      console.timeEnd("chat-api");

      return res.json({
        agent,
        answer: "Information not found.",
        sources: [],
      });
    }

    // =========================
    // CONTEXT
    // =========================
    const context = documents.join("\n\n");

    // =========================
    // LLM
    // =========================
    console.time("llm-answer");

    const answer = await generateAnswer(
      question,
      context
    );

    console.timeEnd("llm-answer");

    // =========================
    // SOURCES
    // =========================
    const sources = [
      ...new Set(
        metadatas.map((item) => item.source)
      ),
    ];

    console.timeEnd("chat-api");

    res.json({
      agent,
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