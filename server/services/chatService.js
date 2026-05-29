// const { Ollama } = require("ollama");
const { GoogleGenAI } = require("@google/genai");

// const ollama = new Ollama({
//   host: "http://127.0.0.1:11434",
// });

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
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

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash-lite",
    contents: prompt,

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

  return response.text;
}

module.exports = generateAnswer;