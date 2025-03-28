// /**
//  * Text Analyzer Tool - Production Level Implementation
//  * 
//  * Features:
//  * - CRUD operations for texts in the database
//  * - APIs for word, character, sentence, and paragraph counts
//  * - Longest word detection
//  * - Security, logging, and performance optimizations
//  */

// // Required Modules
// import express from 'express';
// import bodyParser from 'body-parser';
// import { analyzeText } from './utils/analyzer';
// import { connectDB } from './config/database';
// import { textRoutes } from './routes/textRoutes';
// import dotenv from 'dotenv';
// import morgan from 'morgan';
// import helmet from 'helmet';
// import rateLimit from 'express-rate-limit';
// import cors from 'cors';

// dotenv.config();

// const app = express();
// const PORT = process.env.PORT || 5000;

// // Middleware Setup
// app.use(bodyParser.json());
// app.use(helmet()); // Security headers
// app.use(cors()); // Cross-origin support
// app.use(morgan('dev')); // Logging

// // Rate Limiting
// const limiter = rateLimit({
//   windowMs: 15 * 60 * 1000, // 15 minutes
//   max: 100, // Limit each IP
// });
// app.use(limiter);

// // Database Connection
// connectDB();

// // Routes
// app.use('/api/text', textRoutes);

// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });

// /**
//  * API Endpoints:
//  * 1. POST /api/text - Create Text
//  * 2. GET /api/text/:id - Retrieve Text & Analysis
//  * 3. PUT /api/text/:id - Update Text
//  * 4. DELETE /api/text/:id - Delete Text
//  */
