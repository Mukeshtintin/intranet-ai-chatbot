const { Ollama } = require("ollama");

const ollama = new Ollama({
  host: "http://127.0.0.1:11434",
});

async function generateAnswer(question, context) {
  const prompt = `
Answer ONLY from the context below.

If not found, say:
"Information not found."

Context:
${context}

Question:
${question}
`;

  const response = await ollama.chat({
    model: "phi3:mini",

    messages: [
      {
        role: "user",
        content: prompt,
      },
    ],

    options: {
      temperature: 0,
      num_predict: 80,
      top_k: 20,
      top_p: 0.7,
    },
  });

  return response.message.content;
}

module.exports = generateAnswer;