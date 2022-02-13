import StandardError from './standard-error';
import { ErrorCodes } from './error-codes';
export default class ResponseValidationError extends StandardError {
  public readonly isLoggable: boolean;

  constructor(message: string, errorContext: any, loggable = false) {
    super(ErrorCodes.RESPONSE_VALIDATION_ERROR, message, null, errorContext);

    Object.setPrototypeOf(this, ResponseValidationError.prototype);

    this.isLoggable = loggable;
  }
}
