import { Service } from 'typedi';

@Service()
export class LoggerService {
  private readonly logger: any;
  private readonly environment: string;
  constructor() {
    this.environment = process.env.NODE_ENV || 'local';
  }
  error(
    err?: Error,
    msg?: string,
    param1?: Record<string, unknown> | string
  ): void {
    console.error(err, msg, param1 as any);
  }

  warn(param1: Record<string, unknown> | string, param2?: string): void {
    if (typeof param1 === 'string') {
      console.warn(param1);
    } else if (typeof param1 === 'object') {
      console.warn(param1, param2);
    }
  }

  info(param1: Record<string, unknown> | string, param2?: string): void {
    if (typeof param1 === 'string') {
      console.info(param1);
    } else if (typeof param1 === 'object') {
      console.info(param1, param2);
    }
  }

  debug(param1: Record<string, unknown> | string, param2?: string): void {
    if (typeof param1 === 'string') {
      console.debug(param1);
    } else if (typeof param1 === 'object') {
      console.debug(param1, param2);
    }
  }
}
