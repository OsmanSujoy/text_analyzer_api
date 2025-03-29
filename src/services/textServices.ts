import { prisma } from '../config/database';

export const createText = async (content: string) => {
  const textEntry = await prisma.text.create({ data: { content } });
  return textEntry;
};

export const getTextById = async (id: string) => {
  const textEntry = await prisma.text.findUnique({ where: { id } });
  return textEntry;
};

export const updateText = async (id: string, content: string) => {
  const updatedText = await prisma.text.update({
    where: { id },
    data: { content },
  });
  return updatedText;
};

export const deleteText = async (id: string) => {
  const deletedText = await prisma.text.delete({ where: { id } });
  return deletedText;
};
