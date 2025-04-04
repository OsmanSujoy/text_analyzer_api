import express from 'express';
import validatingRequest from '../middleware/validateRequest';
import {
  createTextController,
  getTextController,
  updateTextController,
  deleteTextController,
  getWordCount,
  getCharacterCount,
  getSentenceCount,
  getParagraphCount,
  getLongestWord,
} from '../controllers/textControllers';
import {
  createTextSchema,
  getTextByIdSchema,
  updateTextSchema,
} from '../dto/textDto';

const router = express.Router();

/**
 * @swagger
 * /api/text:
 *   post:
 *     summary: Create a new text entry
 *     description: Stores text in the database and returns the created entry.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               content:
 *                 type: string
 *                 example: "The quick brown fox jumps over the lazy dog."
 *     responses:
 *       201:
 *         description: Text created successfully
 *       500:
 *         description: Server error
 */
router.post('/', validatingRequest(createTextSchema), createTextController);

/**
 * @swagger
 * /api/text/{id}:
 *   get:
 *     summary: Retrieve text details with analysis
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Text retrieved successfully
 *       404:
 *         description: Text not found
 */
router.get('/:id', validatingRequest(getTextByIdSchema), getTextController);

/**
 * @swagger
 * /api/text/{id}:
 *   put:
 *     summary: Update an existing text entry
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               content:
 *                 type: string
 *                 example: "Updated text content."
 *     responses:
 *       200:
 *         description: Text updated successfully
 *       404:
 *         description: Text not found
 */
router.put('/:id', validatingRequest(updateTextSchema), updateTextController);

/**
 * @swagger
 * /api/text/{id}:
 *   delete:
 *     summary: Delete a text entry
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Text deleted successfully
 *       404:
 *         description: Text not found
 */
router.delete(
  '/:id',
  validatingRequest(getTextByIdSchema),
  deleteTextController,
);

/**
 * @swagger
 * /api/text/{id}/word-count:
 *   get:
 *     summary: Get word count
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Word count retrieved successfully
 */
router.get(
  '/:id/word-count',
  validatingRequest(getTextByIdSchema),
  getWordCount,
);

/**
 * @swagger
 * /api/text/{id}/character-count:
 *   get:
 *     summary: Get character count
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Character count retrieved successfully
 */
router.get(
  '/:id/character-count',
  validatingRequest(getTextByIdSchema),
  getCharacterCount,
);

/**
 * @swagger
 * /api/text/{id}/sentence-count:
 *   get:
 *     summary: Get sentence count
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Sentence count retrieved successfully
 */
router.get(
  '/:id/sentence-count',
  validatingRequest(getTextByIdSchema),
  getSentenceCount,
);

/**
 * @swagger
 * /api/text/{id}/paragraph-count:
 *   get:
 *     summary: Get paragraph count
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Paragraph count retrieved successfully
 */
router.get(
  '/:id/paragraph-count',
  validatingRequest(getTextByIdSchema),
  getParagraphCount,
);

/**
 * @swagger
 * /api/text/{id}/longest-word:
 *   get:
 *     summary: Get longest word in paragraph
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Longest word retrieved successfully
 */
router.get(
  '/:id/longest-word',
  validatingRequest(getTextByIdSchema),
  getLongestWord,
);

export { router as textRoutes };
