import StandardError from './standard-error';
import { ErrorCodes } from './error-codes';
export default class UnimplementedError extends StandardError {
  public readonly isLoggable: boolean;

  constructor(message: string, loggable = false) {
    super(ErrorCodes.UNIMPLEMENTED, message);

    Object.setPrototypeOf(this, UnimplementedError.prototype);

    this.isLoggable = loggable;
  }
}
