import StandardError from './standard-error';
import { ErrorCodes } from './error-codes';
export default class PreconditionFailedError extends StandardError {
  public readonly isLoggable: boolean;

  constructor(message: string, loggable = false) {
    super(ErrorCodes.PRECONDITION_FAILED_ERROR, message);

    Object.setPrototypeOf(this, PreconditionFailedError.prototype);

    this.isLoggable = loggable;
  }
}
