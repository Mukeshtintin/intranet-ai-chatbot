const fs = require("fs");

const pdfParse = require("pdf-parse");

const mammoth = require("mammoth");

async function extractText(filePath, mimetype) {
  if (mimetype === "application/pdf") {
    const dataBuffer = fs.readFileSync(filePath);

    const data = await pdfParse(dataBuffer);

    return data.text.replace(/\s+/g, " ").trim();
  }

  if (
    mimetype ===
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
  ) {
    const result = await mammoth.extractRawText({
      path: filePath,
    });

    return result.value.replace(/\s+/g, " ").trim();
  }

  return fs
    .readFileSync(filePath, "utf8")
    .replace(/\s+/g, " ")
    .trim();
}

module.exports = extractText;