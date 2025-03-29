"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.textRoutes = void 0;
const express_1 = __importDefault(require("express"));
const textControllers_1 = require("../controllers/textControllers");
const router = express_1.default.Router();
exports.textRoutes = router;
router.post('/', textControllers_1.createTextController);
router.get('/:id', textControllers_1.getTextController);
router.put('/:id', textControllers_1.updateTextController);
router.delete('/:id', textControllers_1.deleteTextController);
router.get('/:id/word-count', textControllers_1.getWordCount);
router.get('/:id/character-count', textControllers_1.getCharacterCount);
router.get('/:id/sentence-count', textControllers_1.getSentenceCount);
router.get('/:id/paragraph-count', textControllers_1.getParagraphCount);
router.get('/:id/longest-word', textControllers_1.getLongestWord);
//# sourceMappingURL=textRoutes.js.map