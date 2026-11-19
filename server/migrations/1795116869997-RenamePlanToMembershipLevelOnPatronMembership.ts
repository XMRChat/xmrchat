import { MigrationInterface, QueryRunner } from "typeorm";

export class RenamePlanToMembershipLevelOnPatronMembership1795116869997 implements MigrationInterface {
    name = 'RenamePlanToMembershipLevelOnPatronMembership1795116869997'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "patron_memberships" DROP CONSTRAINT "FK_9d9be907b934f03f9b0ca45be4a"`);
        await queryRunner.query(`ALTER TABLE "patron_memberships" RENAME COLUMN "plan_id" TO "membership_level_id"`);
        await queryRunner.query(`ALTER TABLE "patron_memberships" ADD CONSTRAINT "FK_047a1412fc54e3b9dc7150567e4" FOREIGN KEY ("membership_level_id") REFERENCES "membership_levels"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "patron_memberships" DROP CONSTRAINT "FK_047a1412fc54e3b9dc7150567e4"`);
        await queryRunner.query(`ALTER TABLE "patron_memberships" RENAME COLUMN "membership_level_id" TO "plan_id"`);
        await queryRunner.query(`ALTER TABLE "patron_memberships" ADD CONSTRAINT "FK_9d9be907b934f03f9b0ca45be4a" FOREIGN KEY ("plan_id") REFERENCES "membership_levels"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
