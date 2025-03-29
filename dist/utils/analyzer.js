"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.analyzeText = void 0;
const analyzeText = (text) => {
    if (!text) {
        return {
            wordCount: 0,
            characterCount: 0,
            sentenceCount: 0,
            paragraphCount: 0,
            longestWords: [],
        };
    }
    const normalizedText = text.toLowerCase().replace(/[^\w\s.]/g, '');
    const words = normalizedText.split(/\s+/).filter((word) => word.length > 0);
    const wordCount = words.length;
    const characterCount = text.replace(/\s+/g, '').length;
    const sentenceCount = text
        .split(/[.?!]/)
        .filter((sentence) => sentence.trim().length > 0).length;
    const paragraphCount = text
        .split(/\n+/)
        .filter((paragraph) => paragraph.trim().length > 0).length;
    const paragraphs = text
        .split(/\n+/)
        .filter((paragraph) => paragraph.trim().length > 0);
    const longestWords = paragraphs.flatMap((paragraph) => {
        const words = paragraph.split(/\s+/);
        const maxLength = Math.max(...words.map((word) => word.length));
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
exports.analyzeText = analyzeText;
//# sourceMappingURL=analyzer.js.map