function chunkText(text, chunkSize = 120, overlap = 20) {
  const words = text.split(/\s+/);

  const chunks = [];

  let start = 0;

  while (start < words.length) {
    const end = start + chunkSize;

    const chunk = words
      .slice(start, end)
      .join(" ");

    chunks.push(chunk);

    start += chunkSize - overlap;
  }

  return chunks;
}

module.exports = chunkText;