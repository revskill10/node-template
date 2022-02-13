/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { NextApiResponse as Response } from 'next';
import { NextFunction } from 'connect';
import * as jf from 'joiful';
type AConstructorTypeOf<T> = new (...args: any[]) => T;

function entries<O extends Record<string, any>>(
  obj: O
): [keyof O, typeof obj[keyof O]][] {
  return Object.entries(obj) as [keyof O, typeof obj[keyof O]][];
}

const requestValidation = (schema: {
  headers?: AConstructorTypeOf<any>;
  params?: AConstructorTypeOf<any>;
  query?: AConstructorTypeOf<any>;
  body?: AConstructorTypeOf<any>;
}) => {
  return (req, res: Response, next: NextFunction) => {
    for (const [loc, s] of entries(schema)) {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const result = jf.validateAsClass(req[loc], s, {
        abortEarly: true,
        stripUnknown: { objects: true },
      });

      (req as any)[loc] = result.value;
      if (result.error) {
        const error = result.error;
        if (error.name === 'ValidationError') {
          return res.status(400).json({
            error_code: 'API_VALIDATION_ERROR',
            message:
              'There was an error with the format submitted to the server',
            errors: error.details,
          });
        }
        return next(error);
      }
    }
    return next(null);
  };
};

export default requestValidation;
