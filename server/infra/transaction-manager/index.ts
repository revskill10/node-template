export interface ITransactionManager<T> {
  start(): Promise<T>;
  commit(queryRunner: T): Promise<void>;
  rollback(queryRunner: T): Promise<void>;
}
