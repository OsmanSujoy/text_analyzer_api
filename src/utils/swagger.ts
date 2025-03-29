import swaggerJSDoc from 'swagger-jsdoc';

// Swagger Options
export const swaggerOptions: swaggerJSDoc.Options = {
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
  apis: ['src/routes/*.ts'], // Ensure TypeScript file path
};
