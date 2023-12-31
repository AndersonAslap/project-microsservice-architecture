import { MigrationInterface, QueryRunner } from "typeorm"

export class CreateTableAccount1699142672507 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE accounts (
                id UUID PRIMARY KEY,
                client_id UUID NOT NULL,
                balancer int,
                created_at TIMESTAMP NOT NULL DEFAULT now(),
                updated_at TIMESTAMP NOT NULL DEFAULT now(),
                FOREIGN KEY (client_id) REFERENCES clients (id)
            );
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE IF EXISTS accounts;`);
    }

}
