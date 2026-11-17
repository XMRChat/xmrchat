import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddXmrpodPush1792036800000 implements MigrationInterface {
  name = 'AddXmrpodPush1792036800000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "xmrpod_push_subscriptions" ("id" uuid NOT NULL, "token_hash" character varying NOT NULL, "endpoint" text NOT NULL, "p256dh" character varying NOT NULL, "auth" character varying NOT NULL, "challenge" uuid, "verified_at" TIMESTAMP WITH TIME ZONE, "expires_at" TIMESTAMP WITH TIME ZONE NOT NULL, CONSTRAINT "PK_xmrpod_push_subscriptions" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "xmrpod_live_push_states" ("page_id" integer NOT NULL, "session_id" uuid NOT NULL, "identities" jsonb NOT NULL DEFAULT '{}', "started_at" TIMESTAMP WITH TIME ZONE NOT NULL, "last_seen_at" TIMESTAMP WITH TIME ZONE NOT NULL, CONSTRAINT "PK_xmrpod_live_push_states" PRIMARY KEY ("page_id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "xmrpod_live_push_states"`);
    await queryRunner.query(`DROP TABLE "xmrpod_push_subscriptions"`);
  }
}
