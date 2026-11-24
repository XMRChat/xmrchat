import { MigrationInterface, QueryRunner } from "typeorm";

export class AddPatronMessageStatusAndLevels1795487602498 implements MigrationInterface {
    name = 'AddPatronMessageStatusAndLevels1795487602498'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "patron_message_membership_levels" ("patron_message_id" integer NOT NULL, "membership_level_id" integer NOT NULL, CONSTRAINT "PK_74f1cb9d0d9b02251865867c5c9" PRIMARY KEY ("patron_message_id", "membership_level_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_d7684cadd37f1c706d099a8a49" ON "patron_message_membership_levels" ("patron_message_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_13f6547630ec92f1fde8afe2b2" ON "patron_message_membership_levels" ("membership_level_id") `);
        await queryRunner.query(`ALTER TABLE "patron_messages" ADD "status" character varying NOT NULL DEFAULT 'scheduled'`);
        await queryRunner.query(`ALTER TABLE "patron_message_membership_levels" ADD CONSTRAINT "FK_d7684cadd37f1c706d099a8a493" FOREIGN KEY ("patron_message_id") REFERENCES "patron_messages"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "patron_message_membership_levels" ADD CONSTRAINT "FK_13f6547630ec92f1fde8afe2b21" FOREIGN KEY ("membership_level_id") REFERENCES "membership_levels"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "patron_message_membership_levels" DROP CONSTRAINT "FK_13f6547630ec92f1fde8afe2b21"`);
        await queryRunner.query(`ALTER TABLE "patron_message_membership_levels" DROP CONSTRAINT "FK_d7684cadd37f1c706d099a8a493"`);
        await queryRunner.query(`ALTER TABLE "patron_messages" DROP COLUMN "status"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_13f6547630ec92f1fde8afe2b2"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_d7684cadd37f1c706d099a8a49"`);
        await queryRunner.query(`DROP TABLE "patron_message_membership_levels"`);
    }

}
