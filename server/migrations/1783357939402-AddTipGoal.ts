import { MigrationInterface, QueryRunner } from "typeorm";

export class AddTipGoal1783357939402 implements MigrationInterface {
    name = 'AddTipGoal1783357939402'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "tip_goals" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "amount" bigint NOT NULL, "start_time" TIMESTAMP WITH TIME ZONE NOT NULL, "end_time" TIMESTAMP WITH TIME ZONE, "description" character varying, "is_active" boolean NOT NULL DEFAULT true, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "page_id" integer, CONSTRAINT "REL_e8ae4db6c6d4040b55f56b8a7c" UNIQUE ("page_id"), CONSTRAINT "PK_630b0d15cb06f113aa295fa32b0" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "tip_goals" ADD CONSTRAINT "FK_e8ae4db6c6d4040b55f56b8a7ce" FOREIGN KEY ("page_id") REFERENCES "pages"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tip_goals" DROP CONSTRAINT "FK_e8ae4db6c6d4040b55f56b8a7ce"`);
        await queryRunner.query(`DROP TABLE "tip_goals"`);
    }

}
