import { Request, Response, NextFunction } from 'express';
import { AnyZodObject } from 'zod';

const validatingRequest =
  (schema: AnyZodObject) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      next();
    } catch (e: any) {
      // console.dir(e);
      return res.status(400).json({
        errors: [
          {
            title: 'Bad Request',
            detail: e.errors[0] ? JSON.stringify(e.errors[0]) : 'Invalid data',
            code: 400,
          },
        ],
      });
    }
  };

export default validatingRequest;
