const express = require("express");

const { ChromaClient } = require("chromadb");

const router = express.Router();

const client = new ChromaClient({
  host: "127.0.0.1",
  port: 8000,
});

// =========================
// GET ALL COLLECTIONS
// =========================
router.get("/collections", async (req, res) => {
  try {
    const collections =
      await client.listCollections();

    res.json({
      totalCollections: collections.length,
      collections: collections.map(
        (c) => c.name
      ),
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      error:
        "Failed to fetch collections",
    });
  }
});

// =========================
// GET DOCUMENTS INSIDE COLLECTION
// =========================
router.get("/:collectionName", async (req, res) => {

  try {

    const collection =
      await client.getCollection({
        name: req.params.collectionName,
        embeddingFunction: null,
      });

    const data = await collection.get();

    res.json({
      collection:
        req.params.collectionName,

      totalDocuments:
        data.ids.length,

      documents:
        data.documents,

      metadata:
        data.metadatas,
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      error:
        "Failed to fetch collection data",
    });
  }
});

module.exports = router;