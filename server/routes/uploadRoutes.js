const express = require("express");

const multer = require("multer");

const { v4: uuidv4 } = require("uuid");

const extractText = require("../services/documentService");

const splitPolicies = require("../services/policySplitter");

const chunkText = require("../utils/chunkText");

const createEmbedding = require("../services/embeddingService");

const getCollection = require("../services/chromaService");

const router = express.Router();

const upload = multer({
  dest: "uploads/",
});

router.post("/", upload.single("file"), async (req, res) => {
  try {
    const file = req.file;

    const text = await extractText(
      file.path,
      file.mimetype
    );

    const policySections =
      splitPolicies(text);

    let totalChunks = 0;

    for (const [
      collectionName,
      policyText,
    ] of Object.entries(policySections)) {

      console.log(
        "Uploading to Agent:",
        collectionName
      );

      const chunks = chunkText(policyText);

      totalChunks += chunks.length;

      const collection =
        await getCollection(collectionName);

      for (const chunk of chunks) {

        const embedding =
          await createEmbedding(chunk);

        await collection.add({
          ids: [uuidv4()],

          documents: [chunk],

          embeddings: [embedding],

          metadatas: [
            {
              source: file.originalname,
              agent: collectionName,
            },
          ],
        });
      }
    }

    res.json({
      success: true,
      message:
        "Document uploaded successfully",
      chunksStored: totalChunks,
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      error: "Upload failed",
    });
  }
});

module.exports = router;