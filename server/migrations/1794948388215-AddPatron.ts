import { MigrationInterface, QueryRunner } from "typeorm";

export class AddPatron1794948388215 implements MigrationInterface {
    name = 'AddPatron1794948388215'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "membership_levels" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "description" character varying NOT NULL, "price" bigint NOT NULL, "duration" integer NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "page_id" integer NOT NULL, CONSTRAINT "PK_706a2a088cb5704950a0316e0a6" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "patrons" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "key_hash" character varying(64) NOT NULL, "key_hint" character varying(4) NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "UQ_84376b60e3404cae231b062f681" UNIQUE ("key_hash"), CONSTRAINT "PK_1adfd7a9fbee37c2558f07e2ed9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "patron_memberships" ("id" SERIAL NOT NULL, "status" character varying NOT NULL DEFAULT 'pending', "duration_start" TIMESTAMP WITH TIME ZONE NOT NULL, "duration_end" TIMESTAMP WITH TIME ZONE NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "patron_id" uuid NOT NULL, "page_id" integer NOT NULL, "plan_id" integer NOT NULL, CONSTRAINT "UQ_patron_memberships_patron_page" UNIQUE ("patron_id", "page_id"), CONSTRAINT "PK_1070b3a94992abe35c2e69ea280" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "patron_page_profiles" ("id" SERIAL NOT NULL, "name" character varying(200) NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "patron_id" uuid NOT NULL, "page_id" integer NOT NULL, CONSTRAINT "UQ_patron_page_profiles_patron_page" UNIQUE ("patron_id", "page_id"), CONSTRAINT "PK_ba5986f6b77ba3f5e73766fc13d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "patron_messages" ("id" SERIAL NOT NULL, "body" text NOT NULL, "send_datetime" TIMESTAMP WITH TIME ZONE NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "page_id" integer NOT NULL, CONSTRAINT "PK_7edfd425a6c15f3ab5f55ffb88c" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."patron_contacts_channel_enum" AS ENUM('email', 'signal', 'simplex')`);
        await queryRunner.query(`CREATE TABLE "patron_contacts" ("id" SERIAL NOT NULL, "channel" "public"."patron_contacts_channel_enum" NOT NULL, "destination" character varying NOT NULL, "enabled" boolean NOT NULL DEFAULT false, "verified" boolean NOT NULL DEFAULT false, "verification_code" character varying, "verification_expires_at" TIMESTAMP WITH TIME ZONE, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "patron_id" uuid NOT NULL, CONSTRAINT "UQ_patron_contacts_patron_channel" UNIQUE ("patron_id", "channel"), CONSTRAINT "PK_f0f4c0354e2e4cdcd37e0ee3973" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "payments" ADD "membership_id" integer`);
        await queryRunner.query(`ALTER TABLE "membership_levels" ADD CONSTRAINT "FK_236da83e4bfe5b300ac8d9e26fb" FOREIGN KEY ("page_id") REFERENCES "pages"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "patron_memberships" ADD CONSTRAINT "FK_32544b133bce33877e9e675a536" FOREIGN KEY ("patron_id") REFERENCES "patrons"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "patron_memberships" ADD CONSTRAINT "FK_d61fcbb066c350b100bda476002" FOREIGN KEY ("page_id") REFERENCES "pages"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "patron_memberships" ADD CONSTRAINT "FK_9d9be907b934f03f9b0ca45be4a" FOREIGN KEY ("plan_id") REFERENCES "membership_levels"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "payments" ADD CONSTRAINT "payments_membership_id_fkey" FOREIGN KEY ("membership_id") REFERENCES "patron_memberships"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "patron_page_profiles" ADD CONSTRAINT "FK_46de392333ce3db9f030ed5e69d" FOREIGN KEY ("patron_id") REFERENCES "patrons"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "patron_page_profiles" ADD CONSTRAINT "FK_c57d324999cbd7d3a27b4d06eee" FOREIGN KEY ("page_id") REFERENCES "pages"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "patron_messages" ADD CONSTRAINT "FK_9a29da2edb4a2dece917491216c" FOREIGN KEY ("page_id") REFERENCES "pages"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "patron_contacts" ADD CONSTRAINT "FK_ab1d0329e4992e038a1f147a701" FOREIGN KEY ("patron_id") REFERENCES "patrons"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "patron_contacts" DROP CONSTRAINT "FK_ab1d0329e4992e038a1f147a701"`);
        await queryRunner.query(`ALTER TABLE "patron_messages" DROP CONSTRAINT "FK_9a29da2edb4a2dece917491216c"`);
        await queryRunner.query(`ALTER TABLE "patron_page_profiles" DROP CONSTRAINT "FK_c57d324999cbd7d3a27b4d06eee"`);
        await queryRunner.query(`ALTER TABLE "patron_page_profiles" DROP CONSTRAINT "FK_46de392333ce3db9f030ed5e69d"`);
        await queryRunner.query(`ALTER TABLE "payments" DROP CONSTRAINT "payments_membership_id_fkey"`);
        await queryRunner.query(`ALTER TABLE "patron_memberships" DROP CONSTRAINT "FK_9d9be907b934f03f9b0ca45be4a"`);
        await queryRunner.query(`ALTER TABLE "patron_memberships" DROP CONSTRAINT "FK_d61fcbb066c350b100bda476002"`);
        await queryRunner.query(`ALTER TABLE "patron_memberships" DROP CONSTRAINT "FK_32544b133bce33877e9e675a536"`);
        await queryRunner.query(`ALTER TABLE "membership_levels" DROP CONSTRAINT "FK_236da83e4bfe5b300ac8d9e26fb"`);
        await queryRunner.query(`ALTER TABLE "payments" DROP COLUMN "membership_id"`);
        await queryRunner.query(`DROP TABLE "patron_contacts"`);
        await queryRunner.query(`DROP TYPE "public"."patron_contacts_channel_enum"`);
        await queryRunner.query(`DROP TABLE "patron_messages"`);
        await queryRunner.query(`DROP TABLE "patron_page_profiles"`);
        await queryRunner.query(`DROP TABLE "patron_memberships"`);
        await queryRunner.query(`DROP TABLE "patrons"`);
        await queryRunner.query(`DROP TABLE "membership_levels"`);
    }

}
