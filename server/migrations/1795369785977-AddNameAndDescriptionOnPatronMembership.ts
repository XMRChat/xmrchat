import { MigrationInterface, QueryRunner } from "typeorm";

export class AddNameAndDescriptionOnPatronMembership1795369785977 implements MigrationInterface {
    name = 'AddNameAndDescriptionOnPatronMembership1795369785977'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "patron_memberships" ADD "name" character varying`);
        await queryRunner.query(`ALTER TABLE "patron_memberships" ADD "description" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "patron_memberships" DROP COLUMN "description"`);
        await queryRunner.query(`ALTER TABLE "patron_memberships" DROP COLUMN "name"`);
    }

}
