import { IncomingMessage, ServerResponse } from 'node:http';

export type Request = IncomingMessage & {
  params?: Record<string, string>;
  [key: string]: unknown;
};
export type Response = ServerResponse;

export type AppOptions = {
  host?: string;
  port?: number;
  prefix?: string;
};

export enum HTTPMethod {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
  PATCH = 'PATCH',
  OPTIONS = 'OPTIONS',
  HEAD = 'HEAD',
  CONNECT = 'CONNECT',
  TRACE = 'TRACE',
}

export type Path = string;
export type Middleware<T = void> = (
  req: Request,
  res: Response,
) => T | Promise<T | Error>;
export type RouteHandler<T = void> = (
  req: Request,
  res: Response,
) => T | Promise<T | Error>;
