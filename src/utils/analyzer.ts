export const analyzeText = (text) => {
  if (!text) {
    return {
      wordCount: 0,
      characterCount: 0,
      sentenceCount: 0,
      paragraphCount: 0,
      longestWords: [],
    };
  }

  // Normalize text (convert to lowercase and remove punctuation)
  const normalizedText = text.toLowerCase().replace(/[^\w\s.]/g, '');

  // Count words
  const words = normalizedText.split(/\s+/).filter((word) => word.length > 0);
  const wordCount = words.length;

  // Count characters (excluding spaces)
  const characterCount = text.replace(/\s+/g, '').length;

  // Count sentences (assuming sentences end with ".")
  const sentenceCount = text
    .split(/[.?!]/)
    .filter((sentence) => sentence.trim().length > 0).length;

  // Count paragraphs (assuming paragraphs are separated by new lines)
  const paragraphCount = text
    .split(/\n+/)
    .filter((paragraph) => paragraph.trim().length > 0).length;

  // Find the longest words in each paragraph
  const paragraphs = text
    .split(/\n+/)
    .filter((paragraph) => paragraph.trim().length > 0);
  const longestWords = paragraphs.flatMap((paragraph) => {
    const words = paragraph.split(/\s+/);

    // Find the maximum word length in the paragraph
    const maxLength = Math.max(...words.map((word) => word.length));

    // Filter words that match the max length
    return words.filter((word) => word.length === maxLength);
  });

  return {
    wordCount,
    characterCount,
    sentenceCount,
    paragraphCount,
    longestWords,
  };
};
