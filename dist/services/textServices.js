"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteText = exports.updateText = exports.getTextById = exports.createText = void 0;
const database_1 = require("../config/database");
const createText = async (content) => {
    const textEntry = await database_1.prisma.text.create({ data: { content } });
    return textEntry;
};
exports.createText = createText;
const getTextById = async (id) => {
    const textEntry = await database_1.prisma.text.findUnique({ where: { id } });
    return textEntry;
};
exports.getTextById = getTextById;
const updateText = async (id, content) => {
    const updatedText = await database_1.prisma.text.update({
        where: { id },
        data: { content },
    });
    return updatedText;
};
exports.updateText = updateText;
const deleteText = async (id) => {
    const deletedText = await database_1.prisma.text.delete({ where: { id } });
    return deletedText;
};
exports.deleteText = deleteText;
//# sourceMappingURL=textServices.js.map