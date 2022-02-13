import StandardError from './standard-error';
import { ErrorCodes } from './error-codes';
export default class ConflictError extends StandardError {
  public readonly isLoggable: boolean;

  constructor(message: string, loggable = false) {
    super(ErrorCodes.CONFLICT, message);

    Object.setPrototypeOf(this, ConflictError.prototype);

    this.isLoggable = loggable;
  }
}
