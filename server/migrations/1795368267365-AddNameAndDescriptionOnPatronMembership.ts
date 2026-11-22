import { MigrationInterface, QueryRunner } from "typeorm";

export class AddNameAndDescriptionOnPatronMembership1795368267365 implements MigrationInterface {
    name = 'AddNameAndDescriptionOnPatronMembership1795368267365'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "patron_memberships" ADD "name" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "patron_memberships" ADD "description" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "patron_memberships" DROP COLUMN "description"`);
        await queryRunner.query(`ALTER TABLE "patron_memberships" DROP COLUMN "name"`);
    }

}
