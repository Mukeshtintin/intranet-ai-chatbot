const { Ollama } = require("ollama");

const ollama = new Ollama({
  host: "http://127.0.0.1:11434",
});

async function generateAnswer(question, context) {
  const prompt = `
You are a company intranet AI assistant.

Answer ONLY from the provided context.

If answer is unavailable, say:
"I could not find that information in company documents."

Context:
${context}

Question:
${question}
`;

  const response = await ollama.chat({
    model: "llama3.2",
    messages: [
      {
        role: "user",
        content: prompt,
      },
    ],
  });

  return response.message.content;
}

module.exports = generateAnswer;