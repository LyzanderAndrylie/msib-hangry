import { Request } from '@/app';

/**
 * parse request with JSON body to `req.body`
 */
export async function JSONParser(req: Request): Promise<void | Error> {
  if (req.headers['content-type'] !== 'application/json') return;

  return new Promise((resolve, rejects) => {
    const body: Buffer[] = [];
    req
      .on('data', (chunk) => {
        body.push(chunk);
      })
      .on('end', () => {
        try {
          const json = JSON.parse(Buffer.concat(body).toString());
          req.body = json;
          resolve();
        } catch (error) {
          rejects(error);
        }
      });
  });
}
