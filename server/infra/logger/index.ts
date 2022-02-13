
export interface LogFn {
  (context: Record<string, unknown>, msg: string): void;
  (msg: string): void;
}

export interface ErrLogFn {
  (error: Error, msg: string, context: Record<string, unknown>): void;
  (error: Error, msg: string): void;
}

export interface ILogger {
  error: ErrLogFn;
  warn: LogFn;
  info: LogFn;
  debug: LogFn;
}