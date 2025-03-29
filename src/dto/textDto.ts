import { object, string } from 'zod';

export const createTextSchema = object({
  body: object({
    content: string({
      required_error: 'content is required',
    }),
  }).strict(),
  params: object({}).strict(),
  query: object({}).strict(),
});

export class TextCreateInput {
  content: string;
}

export const updateTextSchema = object({
  body: object({
    content: string({
      required_error: 'content is required',
    }),
  }).strict(),
  params: object({
    id: string({
      required_error: 'Text ID is required',
    }),
  }).strict(),
  query: object({}).strict(),
});

export const getTextByIdSchema = object({
  body: object({}).strict(),
  params: object({
    id: string({
      required_error: 'Text ID is required',
    }),
  }).strict(),
  query: object({}).strict(),
});

export class TextWhereUniqueInput {
  id: string;
}
