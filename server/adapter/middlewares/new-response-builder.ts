import { NextFunction } from 'connect';
import { NextApiRequest } from 'next';
import { ResponseValidationError } from 'server/domain/errors';
import type { BaseReponse } from './types';
import * as jf from 'joiful';
type AConstructorTypeOf<T> = new (...args: any[]) => T;

export const buildResponse = <T>(schema: AConstructorTypeOf<T>) => {
  return async (
    req: NextApiRequest,
    res: BaseReponse<any>,
    next: NextFunction
  ): Promise<void> => {
    const validatedResponseData = jf.validateAsClass(
      res.locals.response_data,
      schema,
      {
        // schema.validate(responseData, {
        stripUnknown: { objects: true },
      }
    );

    if (validatedResponseData.error) {
      return next(
        new ResponseValidationError('Could not validate response data', {
          data: validatedResponseData.error,
        })
      );
    }

    res.status(200).json({ success: true, data: validatedResponseData.value });
  };
};
