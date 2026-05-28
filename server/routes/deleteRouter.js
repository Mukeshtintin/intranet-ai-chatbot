const express = require("express");

const { ChromaClient } = require("chromadb");

const router = express.Router();

const client = new ChromaClient({
  host: "127.0.0.1",
  port: 8000,
});

// =========================
// DELETE ALL FILES FROM DB
// =========================
router.delete("/all", async (req, res) => {
  try {
    const collections =
      await client.listCollections();

    let totalDeleted = 0;

    for (const col of collections) {
      const collection =
        await client.getCollection({
          name: col.name,
        });

      const data = await collection.get();

      if (data.ids.length > 0) {
        await collection.delete({
          ids: data.ids,
        });

        totalDeleted += data.ids.length;
      }
    }

    res.json({
      success: true,
      deletedChunks: totalDeleted,
      message:
        "All files deleted successfully",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      error: "Failed to delete files",
    });
  }
});

module.exports = router;