import express, {
  type Request,
  type Response,
  type NextFunction,
} from 'express';
import http from 'http';
import dotenv from 'dotenv';
dotenv.config();
import helmet from 'helmet';
import cors from 'cors';
import { rateLimit } from 'express-rate-limit';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import logger from './utils/logger';
import { textRoutes } from './routes/textRoutes';
import { swaggerOptions } from './utils/swagger';

const PORT = process.env.PORT || 5000;
const getDurationInMilliseconds = (start: [number, number]) => {
  const NS_PER_SEC = 1e9;
  const NS_TO_MS = 1e6;
  const diff = process.hrtime(start);

  return (diff[0] * NS_PER_SEC + diff[1]) / NS_TO_MS;
};

const app = express();

// export const StartServer = async () => {
app.use(helmet());
app.set('trust proxy', 1);

app.use(cors()); // Cross-origin support

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: 'Too many requests',
});
app.use(limiter);

app.use((req, res, next) => {
  const start = process.hrtime();
  res.on('finish', () => {
    const durationInMilliseconds = getDurationInMilliseconds(start);
    logger.info(
      `Method: [${req.method}] - Url: [${req.originalUrl}] IP: [${
        req.header('x-forwarded-for')
          ? req.header('x-forwarded-for')
          : req.socket.remoteAddress
      }] - Status: [${
        res.statusCode
      }] - TD: [${durationInMilliseconds.toFixed(1)} ms]`,
    );
  });
  next();
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//RULES OF OUR APIS
app.use((req: Request, res: Response, next: NextFunction) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin,X-Requested-with,Content-Type,Accept,Authorization',
  );

  if (req.method == 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'PUT,POST,PATCH,DELETE,GET');
    return res.status(200).json({});
  }
  next();
});

// Initialize Swagger Docs
const swaggerDocs = swaggerJSDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

//API ROUTES WITH VERSION
app.use('/api/text', textRoutes);

//API HEALTHCHECK

app.get('/ping', (req, res) => res.status(200).json({ message: 'pong' }));

//API ERROR HANDLING
app.use((req, res) => {
  logger.error('Can not find the requested resource');
  return res.status(404).json({
    error: {
      title: 'Not found',
      detail: 'Can not find the requested resource',
      code: 404,
    },
  });
});

//HANDEL ALL ERROR THROW BY CONTROLLERS
app.use(function (err: any, req: any, res: any) {
  console.log(err.stack);
  logger.error(err.stack.split('\n', 2).join(''));

  return res.status(500).json({
    error: {
      title: 'General error',
      detail: 'An error occurred, Please retry again later',
      code: 500,
    },
  });
});

//YOUR SERVER LISTEN

// };

// StartServer();
// Start Server
const server = http.createServer(app);
export const StartServer = () =>
  new Promise((resolve) => {
    server.listen(PORT, () => {
      logger.info(`Server is running on port ${PORT}`);
      logger.info(`Doc are available on  http://localhost:${PORT}/api-docs`);
      resolve(server);
    });
  });

export const StopServer = () =>
  new Promise((resolve, reject) => {
    server.close((err) => {
      if (err) return reject(err);
      resolve(true);
    });
  });
export { app, server };
