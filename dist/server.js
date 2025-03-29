"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.server = exports.app = exports.StopServer = exports.StartServer = void 0;
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const helmet_1 = __importDefault(require("helmet"));
const cors_1 = __importDefault(require("cors"));
const express_rate_limit_1 = require("express-rate-limit");
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const logger_1 = __importDefault(require("./utils/logger"));
const textRoutes_1 = require("./routes/textRoutes");
const swagger_1 = require("./utils/swagger");
const PORT = process.env.PORT || 5000;
const getDurationInMilliseconds = (start) => {
    const NS_PER_SEC = 1e9;
    const NS_TO_MS = 1e6;
    const diff = process.hrtime(start);
    return (diff[0] * NS_PER_SEC + diff[1]) / NS_TO_MS;
};
const app = (0, express_1.default)();
exports.app = app;
app.use((0, helmet_1.default)());
app.set('trust proxy', 1);
app.use((0, cors_1.default)());
const limiter = (0, express_rate_limit_1.rateLimit)({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: 'Too many requests',
});
app.use(limiter);
app.use((req, res, next) => {
    const start = process.hrtime();
    res.on('finish', () => {
        const durationInMilliseconds = getDurationInMilliseconds(start);
        logger_1.default.info(`Method: [${req.method}] - Url: [${req.originalUrl}] IP: [${req.header('x-forwarded-for')
            ? req.header('x-forwarded-for')
            : req.socket.remoteAddress}] - Status: [${res.statusCode}] - TD: [${durationInMilliseconds.toFixed(1)} ms]`);
    });
    next();
});
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.json());
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin,X-Requested-with,Content-Type,Accept,Authorization');
    if (req.method == 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT,POST,PATCH,DELETE,GET');
        return res.status(200).json({});
    }
    next();
});
const swaggerDocs = (0, swagger_jsdoc_1.default)(swagger_1.swaggerOptions);
app.use('/api-docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerDocs));
app.use('/api/text', textRoutes_1.textRoutes);
app.get('/ping', (req, res) => res.status(200).json({ message: 'pong' }));
app.use((req, res) => {
    logger_1.default.error('Can not find the requested resource');
    return res.status(404).json({
        error: {
            title: 'Not found',
            detail: 'Can not find the requested resource',
            code: 404,
        },
    });
});
app.use(function (err, req, res) {
    console.log(err.stack);
    logger_1.default.error(err.stack.split('\n', 2).join(''));
    return res.status(500).json({
        error: {
            title: 'General error',
            detail: 'An error occurred, Please retry again later',
            code: 500,
        },
    });
});
const server = http_1.default.createServer(app);
exports.server = server;
const StartServer = () => new Promise((resolve) => {
    server.listen(PORT, () => {
        logger_1.default.info(`Server is running on port ${PORT}`);
        logger_1.default.info(`Doc are available on  http://localhost:${PORT}/api-docs`);
        resolve(server);
    });
});
exports.StartServer = StartServer;
const StopServer = () => new Promise((resolve, reject) => {
    server.close((err) => {
        if (err)
            return reject(err);
        resolve(true);
    });
});
exports.StopServer = StopServer;
//# sourceMappingURL=server.js.map