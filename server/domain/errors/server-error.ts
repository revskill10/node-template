import StandardError from './standard-error';
import { ErrorCodes } from './error-codes';
export default class ServerError extends StandardError {
  public readonly isLoggable: boolean;

  constructor(message: string, loggable = false, error?: Error) {
    super(ErrorCodes.INTERNAL_SERVER_ERROR, message, error);

    Object.setPrototypeOf(this, ServerError.prototype);

    this.isLoggable = loggable;
  }
}
