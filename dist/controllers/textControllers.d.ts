import { Request, Response } from 'express';
export declare const createTextController: (req: Request, res: Response) => Promise<void>;
export declare const getTextController: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const updateTextController: (req: Request, res: Response) => Promise<void>;
export declare const deleteTextController: (req: Request, res: Response) => Promise<void>;
export declare const getWordCount: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const getCharacterCount: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const getSentenceCount: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const getParagraphCount: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const getLongestWord: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
