import { Request, Response } from 'express';
import {
  createText,
  deleteText,
  getTextById,
  updateText,
} from '../services/textServices';
import { analyzeText } from '../utils/analyzer';
import logger from '../utils/logger';

export const createTextController = async (req: Request, res: Response) => {
  try {
    const { content } = req.body;
    const result = await createText(content);
    res.status(201).json(result);
  } catch (error) {
    logger.error('Error creating text entry:', error);
    res.status(500).json({ error: 'Error creating text entry' });
  }
};

export const getTextController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await getTextById(id);
    if (!result) return res.status(404).json({ error: 'Text not found' });
    const analysis = analyzeText(result.content);
    res.status(200).json({ ...result, analysis });
  } catch (error) {
    logger.error('Error retrieving text entry:', error);
    res.status(500).json({ error: 'Error retrieving text entry' });
  }
};

export const updateTextController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { content } = req.body;
    const result = await updateText(id, content);
    res.status(200).json(result);
  } catch (error) {
    logger.error('Error updating text entry:', error);
    res.status(500).json({ error: 'Error updating text entry' });
  }
};

export const deleteTextController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await deleteText(id);
    res.status(200).json(result);
  } catch (error) {
    logger.error('Error deleting text entry:', error);
    res.status(500).json({ error: 'Error deleting text entry' });
  }
};

const handleAnalysisRequest = async (
  req: Request,
  res: Response,
  analysisKey: string,
  responseKey: string,
) => {
  try {
    const { id } = req.params;
    const result = await getTextById(id);
    if (!result) return res.status(404).json({ error: 'Text not found' });
    const analysis = analyzeText(result.content);
    res.status(200).json({ ...result, [responseKey]: analysis[analysisKey] });
  } catch (error) {
    logger.error(`Error retrieving ${responseKey} entry:`, error);
    res.status(500).json({ error: 'Error retrieving text entry' });
  }
};

export const getWordCount = (req: Request, res: Response) =>
  handleAnalysisRequest(req, res, 'wordCount', 'wordCount');

export const getCharacterCount = (req: Request, res: Response) =>
  handleAnalysisRequest(req, res, 'characterCount', 'characterCount');

export const getSentenceCount = (req: Request, res: Response) =>
  handleAnalysisRequest(req, res, 'sentenceCount', 'sentenceCount');

export const getParagraphCount = (req: Request, res: Response) =>
  handleAnalysisRequest(req, res, 'paragraphCount', 'paragraphCount');

export const getLongestWord = (req: Request, res: Response) =>
  handleAnalysisRequest(req, res, 'longestWords', 'longestWords');
