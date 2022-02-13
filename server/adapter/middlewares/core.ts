import 'reflect-metadata';
import nc, { NextConnect } from 'next-connect';
import { NextApiRequest, NextApiResponse } from 'next';
import MethodNotAllowedError from 'server/domain/errors/method-not-allowed-error';
import httpContext from 'express-http-context';
import { LoggerService } from 'server/adapter/infra/logger';
import { errorHandler as onError } from 'server/infra/services/error-handler';
const logger = new LoggerService();
/**
 * Helper function to log an exit code before exiting the process.
 */
const logAndExitProcess = (exitCode: number) => {
  logger.info(
    {
      exit_code_number: exitCode,
    },
    'Exiting process'
  );
  process.exit(exitCode);
};
/**
 * Sets up event listeners on unexpected errors and warnings. These should theoretically
 * never happen. If they do, we assume that the app is in a bad state. For errors, we
 * exit the process with code 1.
 */
const setupProcessEventListeners = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  if (process.listeners('unhandledRejection').length <= 0) {
    process.on('unhandledRejection', (reason: any) => {
      logger.warn({ reason_object: reason }, 'encountered unhandled rejection');
      logAndExitProcess(1);
    });
  }

  if (process.listeners('uncaughtException').length <= 0) {
    process.on('uncaughtException', (err: Error) => {
      logger.error(err, 'encountered uncaught exception');
      logAndExitProcess(1);
    });
  }

  if (process.listeners('warning').length <= 0) {
    process.on('warning', (warning: Error) => {
      logger.warn(
        {
          warning_object: warning,
        },
        'encountered warning'
      );
    });
  }
};

export default function core(): NextConnect<NextApiRequest, NextApiResponse> {
  try {
    setupProcessEventListeners();
    return nc({
      attachParams: true,
      onError: (err, req, res) => {
        return onError(err, req, res, httpContext);
      },
      onNoMatch(req, res) {
        return onError(
          new MethodNotAllowedError(`Method ${req.method} Not Allowed`),
          req,
          res,
          httpContext
        );
      },
    }).use((req: any, _, next) => {
      req.app = {
        logger
      };
      return next();
    });
  } catch (err) {
    logger.error(err, 'error caught in base.ts');
  }
}
