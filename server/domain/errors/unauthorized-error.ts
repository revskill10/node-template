import StandardError from './standard-error';
import { ErrorCodes } from './error-codes';
export default class UnauthorizedError extends StandardError {
  public readonly isLoggable: boolean;

  constructor(message: string, loggable = false) {
    super(ErrorCodes.UNAUTHORIZED, message);

    Object.setPrototypeOf(this, UnauthorizedError.prototype);

    this.isLoggable = loggable;
  }
}
