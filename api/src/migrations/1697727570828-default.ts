import { MigrationInterface, QueryRunner } from "typeorm";

export class default1697727570828 implements MigrationInterface {
    name = 'default1697727570828'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Product" DROP COLUMN "url"`);
        await queryRunner.query(`ALTER TABLE "Product" ADD "url" text array NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Product" DROP COLUMN "url"`);
        await queryRunner.query(`ALTER TABLE "Product" ADD "url" text NOT NULL`);
    }

}
