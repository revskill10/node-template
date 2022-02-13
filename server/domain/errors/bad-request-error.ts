import StandardError from './standard-error';
import { ErrorCodes } from './error-codes';
export default class BadRequestError extends StandardError {
  public readonly isLoggable: boolean;

  constructor(message: string, loggable = false) {
    super(ErrorCodes.BAD_REQUEST, message);

    Object.setPrototypeOf(this, BadRequestError.prototype);

    this.isLoggable = loggable;
  }
}
