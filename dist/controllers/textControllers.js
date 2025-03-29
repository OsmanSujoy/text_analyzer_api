"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLongestWord = exports.getParagraphCount = exports.getSentenceCount = exports.getCharacterCount = exports.getWordCount = exports.deleteTextController = exports.updateTextController = exports.getTextController = exports.createTextController = void 0;
const textServices_1 = require("../services/textServices");
const analyzer_1 = require("../utils/analyzer");
const logger_1 = __importDefault(require("../utils/logger"));
const createTextController = async (req, res) => {
    try {
        const { content } = req.body;
        const result = await (0, textServices_1.createText)(content);
        res.status(201).json(result);
    }
    catch (error) {
        logger_1.default.error('Error creating text entry:', error);
        res.status(500).json({ error: 'Error creating text entry' });
    }
};
exports.createTextController = createTextController;
const getTextController = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await (0, textServices_1.getTextById)(id);
        if (!result)
            return res.status(404).json({ error: 'Text not found' });
        const analysis = (0, analyzer_1.analyzeText)(result.content);
        res.status(200).json(Object.assign(Object.assign({}, result), { analysis }));
    }
    catch (error) {
        logger_1.default.error('Error retrieving text entry:', error);
        res.status(500).json({ error: 'Error retrieving text entry' });
    }
};
exports.getTextController = getTextController;
const updateTextController = async (req, res) => {
    try {
        const { id } = req.params;
        const { content } = req.body;
        const result = await (0, textServices_1.updateText)(id, content);
        res.status(200).json(result);
    }
    catch (error) {
        logger_1.default.error('Error updating text entry:', error);
        res.status(500).json({ error: 'Error updating text entry' });
    }
};
exports.updateTextController = updateTextController;
const deleteTextController = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await (0, textServices_1.deleteText)(id);
        res.status(200).json(result);
    }
    catch (error) {
        logger_1.default.error('Error deleting text entry:', error);
        res.status(500).json({ error: 'Error deleting text entry' });
    }
};
exports.deleteTextController = deleteTextController;
const handleAnalysisRequest = async (req, res, analysisKey, responseKey) => {
    try {
        const { id } = req.params;
        const result = await (0, textServices_1.getTextById)(id);
        if (!result)
            return res.status(404).json({ error: 'Text not found' });
        const analysis = (0, analyzer_1.analyzeText)(result.content);
        res.status(200).json(Object.assign(Object.assign({}, result), { [responseKey]: analysis[analysisKey] }));
    }
    catch (error) {
        logger_1.default.error(`Error retrieving ${responseKey} entry:`, error);
        res.status(500).json({ error: 'Error retrieving text entry' });
    }
};
const getWordCount = (req, res) => handleAnalysisRequest(req, res, 'wordCount', 'wordCount');
exports.getWordCount = getWordCount;
const getCharacterCount = (req, res) => handleAnalysisRequest(req, res, 'characterCount', 'characterCount');
exports.getCharacterCount = getCharacterCount;
const getSentenceCount = (req, res) => handleAnalysisRequest(req, res, 'sentenceCount', 'sentenceCount');
exports.getSentenceCount = getSentenceCount;
const getParagraphCount = (req, res) => handleAnalysisRequest(req, res, 'paragraphCount', 'paragraphCount');
exports.getParagraphCount = getParagraphCount;
const getLongestWord = (req, res) => handleAnalysisRequest(req, res, 'longestWords', 'longestWords');
exports.getLongestWord = getLongestWord;
//# sourceMappingURL=textControllers.js.map