import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddPatronLevelNameOnTip1795559432440
  implements MigrationInterface
{
  name = 'AddPatronLevelNameOnTip1795559432440';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "tips" ADD "patron_level_name" character varying`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "tips" DROP COLUMN "patron_level_name"`,
    );
  }
}
