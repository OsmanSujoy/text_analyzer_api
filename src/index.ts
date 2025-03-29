import logger from './utils/logger';
import { StartServer } from './server';

StartServer()
  .then(() =>
    logger.log({ message: '✅ Server started successfully', level: 'info' }),
  )
  .catch((err) => logger.error('❌ Error starting server:', err));
