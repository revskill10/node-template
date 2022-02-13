import _ from 'lodash';
import { StandardError, ErrorCodeMap, ErrorCodes } from 'server/domain/errors';
import { AssertionError } from 'assert';
import { inspect } from 'util';

export const errorHandler = (
  err: Error,
  req: any,
  res: any,
  httpContext: any
): void => {
  console.log('err', inspect(err));
  let error = err as StandardError;
  if (err instanceof AssertionError) {
    error = new StandardError(ErrorCodes.ASSERTION_ERROR, err.message, err, {});
  }

  if (!(err instanceof StandardError)) {
    error = new StandardError(
      ErrorCodes.INTERNAL_SERVER_ERROR,
      'Something unexpected happened! We are investigating this issue right now.',
      err,
      {}
    );
  }

  let traceId;
  let spanId;
  if (httpContext) {
    traceId = httpContext.get('trace_id');
    spanId = httpContext.get('span_id');
  }
  const service = process.env.SERVICE_NAME;
/*
  sentryService.configureScope((scope) => {
    const fullPath = req.url;
    const defaultedErrorCode =
      error.errorCode || `${error.name} ${error.message}`;
    scope.setTag('error_code', defaultedErrorCode);
    scope.setTag('path', `${req.method}|${fullPath}`);
    scope.setFingerprint([service, req.method, fullPath, defaultedErrorCode]);

    const cleanContext = error.context; // scrubber.scrub(error.context || {});
    scope.setExtra('context', cleanContext);
    scope.setExtra('last_error', error.lastError);

    if (httpContext) {
      scope.setTag('trace_id', traceId);
      scope.setTag('span_id', spanId);
    }
  });

  sentryService.captureException(error);
*/
  const statusCode = ErrorCodeMap[error.errorCode];

  if (_.isNumber(statusCode)) {
    return res.status(statusCode).send({
      success: false,
      error_code: error.errorCode,
      message: error.message,
      context: error.context,
    });
  }

  const message =
    error.message ||
    'Something unexpected happened, we are investigating this issue right now';
  return res.status(500).send({
    success: false,
    error_code: ErrorCodes.INTERNAL_SERVER_ERROR,
    message,
  });
};
export type ErrorType = {
  status: number;
  error_code: string;
  message: string;
  context: any;
};
export const errorRenderer = (err: StandardError): ErrorType => {
  const status = ErrorCodeMap[err.errorCode];
  return {
    status,
    error_code: err.errorCode,
    message: err.message,
    context: err.context,
  };
};
