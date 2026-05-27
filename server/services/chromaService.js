const { ChromaClient } = require("chromadb");

const client = new ChromaClient({
  host: "127.0.0.1",
  port: 8000,
});

async function getCollection() {
  const collections = await client.listCollections();

  const existing = collections.find(
    (c) => c.name === "company_docs"
  );

  if (existing) {
    return await client.getCollection({
      name: "company_docs",
    });
  }

  return await client.createCollection({
    name: "company_docs",
    metadata: {
      "hnsw:space": "cosine",
    },
  });
}

module.exports = getCollection;