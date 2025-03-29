"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.swaggerOptions = void 0;
exports.swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Text Analyzer API',
            version: '1.0.0',
            description: 'API for analyzing text data',
            contact: {
                name: 'Support',
                email: 'support@example.com',
            },
        },
        servers: [
            {
                url: 'http://localhost:5000',
                description: 'Local Server',
            },
        ],
    },
    apis: ['src/routes/*.ts'],
};
//# sourceMappingURL=swagger.js.map