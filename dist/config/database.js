"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectDB = exports.prisma = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
exports.prisma = prisma;
const connectDB = async () => {
    try {
        await prisma.$connect();
        console.log('Connected to PostgreSQL');
    }
    catch (error) {
        console.error('Database connection error:', error);
        process.exit(1);
    }
};
exports.connectDB = connectDB;
//# sourceMappingURL=database.js.map