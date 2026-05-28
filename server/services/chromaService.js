const { ChromaClient } = require("chromadb");

const client = new ChromaClient({
  host: "127.0.0.1",
  port: 8000,
});

async function getCollection(collectionName) {
  const collections =
    await client.listCollections();

  const existing = collections.find(
    (c) => c.name === collectionName
  );

  // EXISTING COLLECTION
  if (existing) {
    return await client.getCollection({
      name: collectionName,
      embeddingFunction: null,
    });
  }

  // CREATE NEW COLLECTION
  return await client.createCollection({
    name: collectionName,

    metadata: {
      "hnsw:space": "cosine",
    },

    embeddingFunction: null,
  });
}

module.exports = getCollection;