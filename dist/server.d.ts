/// <reference types="node" />
import http from 'http';
declare const app: import("express-serve-static-core").Express;
declare const server: http.Server<typeof http.IncomingMessage, typeof http.ServerResponse>;
export declare const StartServer: () => Promise<unknown>;
export declare const StopServer: () => Promise<unknown>;
export { app, server };
