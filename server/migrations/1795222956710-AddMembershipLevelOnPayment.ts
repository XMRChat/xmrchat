import { MigrationInterface, QueryRunner } from "typeorm";

export class AddMembershipLevelOnPayment1795222956710 implements MigrationInterface {
    name = 'AddMembershipLevelOnPayment1795222956710'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "payments" ADD "membership_level_id" integer`);
        await queryRunner.query(`ALTER TABLE "payments" ADD CONSTRAINT "payments_membership_level_id_fkey" FOREIGN KEY ("membership_level_id") REFERENCES "membership_levels"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "payments" DROP CONSTRAINT "payments_membership_level_id_fkey"`);
        await queryRunner.query(`ALTER TABLE "payments" DROP COLUMN "membership_level_id"`);
    }

}
