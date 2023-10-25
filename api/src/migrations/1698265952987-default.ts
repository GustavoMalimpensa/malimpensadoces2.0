import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1698265952987 implements MigrationInterface {
    name = 'Default1698265952987'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "name" text NOT NULL, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "Product" ("id" SERIAL NOT NULL, "name" text NOT NULL, "category" text NOT NULL DEFAULT now(), "content" text NOT NULL, "price" integer NOT NULL, "url" text NOT NULL, "user_id" integer NOT NULL, CONSTRAINT "PK_9fc040db7872192bbc26c515710" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "client" ("id" SERIAL NOT NULL, "name" text NOT NULL, "phone" character varying(20) NOT NULL, CONSTRAINT "UQ_368ca99acdbd5502fc08b3f7796" UNIQUE ("phone"), CONSTRAINT "PK_96da49381769303a6515a8785c7" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "Product" ADD CONSTRAINT "FK_69a61a72e9aaa88d70f13fece11" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Product" DROP CONSTRAINT "FK_69a61a72e9aaa88d70f13fece11"`);
        await queryRunner.query(`DROP TABLE "client"`);
        await queryRunner.query(`DROP TABLE "Product"`);
        await queryRunner.query(`DROP TABLE "user"`);
    }

}
