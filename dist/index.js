"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = __importDefault(require("./utils/logger"));
const server_1 = require("./server");
(0, server_1.StartServer)()
    .then(() => logger_1.default.log({ message: '✅ Server started successfully', level: 'info' }))
    .catch((err) => logger_1.default.error('❌ Error starting server:', err));
//# sourceMappingURL=index.js.map