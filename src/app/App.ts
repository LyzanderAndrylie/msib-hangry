import {
  createServer,
  IncomingMessage,
  Server,
  ServerResponse,
} from 'node:http';

import {
  AppOptions,
  HTTPMethod,
  Middleware,
  Path,
  Request,
  Response,
  RouteHandler,
} from './types';
import { matchPath } from './utils';

export default class App {
  private server: Server;
  private middlewares: Map<Path, Middleware>;
  private routes: Map<HTTPMethod, Map<Path, RouteHandler>>;
  private prefix: string;

  constructor(options?: AppOptions) {
    const { host = 'localhost', port = 3000, prefix = '' } = options || {};

    this.server = createServer(this.requestHandler.bind(this));
    this.prefix = prefix;
    this.middlewares = new Map();
    this.routes = new Map();
    Object.values(HTTPMethod).forEach((method) => {
      this.routes.set(method, new Map());
    });

    this.server.listen(port, host, () => {
      console.log(`[server] Server is running on ${host}:${port}`);
    });
  }

  private async requestHandler(req: IncomingMessage, res: ServerResponse) {
    try {
      await this.executeMiddlewares(req as Request, res);

      const handler = this.handler(
        req.method as HTTPMethod,
        req.url as Path,
        req as Request,
      );

      if (handler === undefined) {
        res.writeHead(404).end();
        return;
      }

      await this.executeHandler(handler, req as Request, res);
    } catch {
      res.writeHead(500).end();
      return;
    }
  }

  private handler(
    method: HTTPMethod,
    path: Path,
    req: Request,
  ): RouteHandler | undefined {
    const paths = this.routes.get(method)?.keys() || [];

    for (const routePath of paths) {
      const { match, params } = matchPath(routePath, path);

      if (match) {
        req.params = params;
        return this.routes.get(method)?.get(routePath);
      }
    }

    return undefined;
  }

  private async executeMiddlewares(req: Request, res: Response) {
    for (const [path, middleware] of this.middlewares) {
      if (req.url?.startsWith(path)) {
        const result = middleware(req, res);
        if (result instanceof Promise) await result;
      }
    }
  }

  private async executeHandler(
    handler: RouteHandler,
    req: Request,
    res: Response,
  ) {
    const result = handler(req, res);
    if (result instanceof Promise) await result;
  }

  private setRoute(method: HTTPMethod, path: Path, handler: RouteHandler) {
    this.routes.get(method)?.set(`${this.prefix}${path}`, handler);
  }

  get(path: Path, handler: RouteHandler) {
    this.setRoute(HTTPMethod.GET, path, handler);
  }

  post(path: Path, handler: RouteHandler) {
    this.setRoute(HTTPMethod.POST, path, handler);
  }

  update(path: Path, handler: RouteHandler) {
    this.setRoute(HTTPMethod.PUT, path, handler);
  }

  patch(path: Path, handler: RouteHandler) {
    this.setRoute(HTTPMethod.PATCH, path, handler);
  }

  delete(path: Path, handler: RouteHandler) {
    this.setRoute(HTTPMethod.DELETE, path, handler);
  }

  use(path: Path, middleware: Middleware) {
    this.middlewares.set(`${this.prefix}${path}`, middleware);
  }
}
