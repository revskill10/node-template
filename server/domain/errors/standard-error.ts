type ErrorContext = Record<string, unknown>;
export default class StandardError extends Error {
  public readonly errorCode: string;

  public readonly lastError?: Error | null;

  public readonly context?: ErrorContext | null;

  constructor(
    errorCode: string,
    message: string,
    lastError?: Error | null,
    context?: ErrorContext | null
  ) {
    super(message);
    Object.setPrototypeOf(this, new.target.prototype);

    this.name = this.constructor.name;
    this.errorCode = errorCode;
    this.lastError = lastError;
    this.context = context;
  }
}
