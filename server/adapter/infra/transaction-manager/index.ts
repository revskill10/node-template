import { Connection, QueryRunner } from 'typeorm';
import { ITransactionManager } from 'server/infra/transaction-manager';

export class TransactionManager
  implements ITransactionManager<QueryRunner>
{
  private readonly connection: Connection
  constructor(params) {
    this.connection = params.connection;
  }

  async start(): Promise<QueryRunner> {
    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.startTransaction();
    return queryRunner;
  }

  async commit(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.commitTransaction();
    await queryRunner.release();
  }

  async rollback(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.rollbackTransaction();
    await queryRunner.release();
  }
}
