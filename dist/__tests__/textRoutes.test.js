"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const server_1 = require("../server");
const database_1 = require("../config/database");
const createdText = {
    id: '123',
    content: 'The quick brown fox jumps over the lazy dog. The lazy dog slept in the sun.',
    createdAt: new Date().toISOString(),
};
jest.mock('../config/database', () => {
    const mockResolvedValue = {
        id: '123',
        content: 'The quick brown fox jumps over the lazy dog. The lazy dog slept in the sun.',
        createdAt: new Date().toISOString(),
    };
    return {
        prisma: {
            text: {
                create: jest.fn().mockResolvedValue(mockResolvedValue),
                findUnique: jest.fn().mockResolvedValue(mockResolvedValue),
            },
        },
    };
});
beforeAll(async () => {
    await (0, server_1.StartServer)();
});
afterAll(async () => {
    await (0, server_1.StopServer)();
});
describe('Text Analyzer API Tests', () => {
    test('Create a new text entry', async () => {
        database_1.prisma.text.create.mockResolvedValue(createdText);
        const response = await (0, supertest_1.default)(server_1.app)
            .post('/api/text')
            .send({ content: createdText.content });
        createdText.id = response.body.id;
        expect(response.status).toBe(201);
        expect(response.body.content).toBe(createdText.content);
    });
    test('Get word count', async () => {
        database_1.prisma.text.findUnique.mockResolvedValue(createdText);
        const response = await (0, supertest_1.default)(server_1.app).get(`/api/text/${createdText.id}/word-count`);
        expect(response.status).toBe(200);
        expect(response.body.wordCount).toBe(16);
    });
    test('Get character count', async () => {
        database_1.prisma.text.findUnique.mockResolvedValue(createdText);
        const response = await (0, supertest_1.default)(server_1.app).get(`/api/text/${createdText.id}/character-count`);
        expect(response.status).toBe(200);
        expect(response.body.characterCount).toBeGreaterThan(50);
    });
    test('Get sentence count', async () => {
        database_1.prisma.text.findUnique.mockResolvedValue(createdText);
        const response = await (0, supertest_1.default)(server_1.app).get(`/api/text/${createdText.id}/sentence-count`);
        expect(response.status).toBe(200);
        expect(response.body.sentenceCount).toBe(2);
    });
    test('Get paragraph count', async () => {
        database_1.prisma.text.findUnique.mockResolvedValue(createdText);
        const response = await (0, supertest_1.default)(server_1.app).get(`/api/text/${createdText.id}/paragraph-count`);
        expect(response.status).toBe(200);
        expect(response.body.paragraphCount).toBe(1);
    });
    test('Get longest word in paragraph', async () => {
        database_1.prisma.text.findUnique.mockResolvedValue(createdText);
        const response = await (0, supertest_1.default)(server_1.app).get(`/api/text/${createdText.id}/longest-word`);
        expect(response.status).toBe(200);
        expect(response.body.longestWords.length).toBe(4);
    });
});
//# sourceMappingURL=textRoutes.test.js.map