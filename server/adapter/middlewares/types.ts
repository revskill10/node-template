import type { NextApiResponse } from 'next';
class BaseType {}
export type BaseRequest<
  T extends {
    body?: unknown;
    params?: unknown;
    query?: unknown;
    headers?: unknown;
  } = BaseType
> = {
  files?: unknown[];
  body: T['body'];
  params: T['params'];
  query: T['query'];
  headers: T['headers'];
};
export type BaseReponse<T> = NextApiResponse & {
  locals?: T;
};
