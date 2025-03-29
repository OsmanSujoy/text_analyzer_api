import request from 'supertest';
import { app, StartServer, StopServer } from '../server';
import { prisma } from '../config/database';

const createdText = {
  id: '123',
  content:
    'The quick brown fox jumps over the lazy dog. The lazy dog slept in the sun.',
  createdAt: new Date().toISOString(),
};

jest.mock('../config/database', () => {
  const mockResolvedValue = {
    id: '123',
    content:
      'The quick brown fox jumps over the lazy dog. The lazy dog slept in the sun.',
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
  await StartServer();
});

afterAll(async () => {
  await StopServer();
});

describe('Text Analyzer API Tests', () => {
  test('Create a new text entry', async () => {
    (prisma.text.create as jest.Mock).mockResolvedValue(createdText);

    const response = await request(app)
      .post('/api/text')
      .send({ content: createdText.content });
    createdText.id = response.body.id;

    expect(response.status).toBe(201);
    expect(response.body.content).toBe(createdText.content);
  });

  test('Get word count', async () => {
    (prisma.text.findUnique as jest.Mock).mockResolvedValue(createdText);

    const response = await request(app).get(
      `/api/text/${createdText.id}/word-count`,
    );

    expect(response.status).toBe(200);
    expect(response.body.wordCount).toBe(16);
  });

  test('Get character count', async () => {
    (prisma.text.findUnique as jest.Mock).mockResolvedValue(createdText);

    const response = await request(app).get(
      `/api/text/${createdText.id}/character-count`,
    );

    expect(response.status).toBe(200);
    expect(response.body.characterCount).toBeGreaterThan(50);
  });

  test('Get sentence count', async () => {
    (prisma.text.findUnique as jest.Mock).mockResolvedValue(createdText);

    const response = await request(app).get(
      `/api/text/${createdText.id}/sentence-count`,
    );

    expect(response.status).toBe(200);
    expect(response.body.sentenceCount).toBe(2);
  });

  test('Get paragraph count', async () => {
    (prisma.text.findUnique as jest.Mock).mockResolvedValue(createdText);

    const response = await request(app).get(
      `/api/text/${createdText.id}/paragraph-count`,
    );

    expect(response.status).toBe(200);
    expect(response.body.paragraphCount).toBe(1);
  });

  test('Get longest word in paragraph', async () => {
    (prisma.text.findUnique as jest.Mock).mockResolvedValue(createdText);

    const response = await request(app).get(
      `/api/text/${createdText.id}/longest-word`,
    );

    expect(response.status).toBe(200);
    expect(response.body.longestWords.length).toBe(4);
  });
});
