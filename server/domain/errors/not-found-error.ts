import StandardError from './standard-error';
import { ErrorCodes } from './error-codes';
export default class NotFoundError extends StandardError {
  public readonly isLoggable: boolean;

  constructor(message: string, loggable = false) {
    super(ErrorCodes.NOT_FOUND, message);

    Object.setPrototypeOf(this, NotFoundError.prototype);

    this.isLoggable = loggable;
  }
}
