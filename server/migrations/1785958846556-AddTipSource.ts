import { MigrationInterface, QueryRunner } from "typeorm";

export class AddTipSource1785958846556 implements MigrationInterface {
    name = 'AddTipSource1785958846556'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tips" ADD "source" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tips" DROP COLUMN "source"`);
    }

}
