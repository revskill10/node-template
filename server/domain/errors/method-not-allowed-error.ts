import StandardError from './standard-error';
import { ErrorCodes } from './error-codes';
export default class MethodNotAllowedError extends StandardError {
  public readonly isLoggable: boolean;

  constructor(message: string, errorContext: any = {}, loggable = false) {
    super(ErrorCodes.METHOD_NOT_ALLOWED_ERROR, message, null, errorContext);

    Object.setPrototypeOf(this, MethodNotAllowedError.prototype);

    this.isLoggable = loggable;
  }
}
