const { Ollama } = require("ollama");

const ollama = new Ollama({
  host: "http://127.0.0.1:11434",
});

async function generateAnswer(question, context) {
  console.log("Generating answer for question:", question);
  const prompt = `
Answer ONLY using the context.

Keep the answer short.

If answer is missing say:
"Information not found."

Context:
${context}

Question:
${question}

Answer:
`;

  const response = await ollama.chat({
    model: "tinyllama",

    messages: [
      {
        role: "user",
        content: prompt,
      },
    ],

    options: {
      temperature: 0,
      num_predict: 20,
    }
  });

  return response.message.content;
}

module.exports = generateAnswer;