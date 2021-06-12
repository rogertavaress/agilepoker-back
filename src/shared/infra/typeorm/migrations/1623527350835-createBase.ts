import {MigrationInterface, QueryRunner} from "typeorm";

export class createBase1623527350835 implements MigrationInterface {
    name = 'createBase1623527350835'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "votes" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "number" integer NOT NULL, "history_id" uuid NOT NULL, "participant_id" uuid NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_f3d9fd4a0af865152c3f59db8ff" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "participants" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "meet_id" uuid NOT NULL, "longitude" integer, "latitude" integer, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_1cda06c31eec1c95b3365a0283f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "meets_status_enum" AS ENUM('awaiting_sign', 'started', 'played', 'paused', 'finished')`);
        await queryRunner.query(`CREATE TABLE "meets" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "email" character varying NOT NULL, "status" "meets_status_enum" NOT NULL DEFAULT 'awaiting_sign', "history_now_id" uuid, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_898babae2f38d82cfa8b6070cf8" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "histories" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "category" character varying NOT NULL, "time" integer NOT NULL DEFAULT 0, "time_parsed" character varying NOT NULL DEFAULT '', "meet_id" uuid NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_36b0e707452a8b674f9d95da743" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "votes" ADD CONSTRAINT "FK_b4e02499c3dae168ef83be12210" FOREIGN KEY ("history_id") REFERENCES "histories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "votes" ADD CONSTRAINT "FK_ae6e97b1b0e7dc4adc626cf0454" FOREIGN KEY ("participant_id") REFERENCES "participants"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "participants" ADD CONSTRAINT "FK_bb8a4d4502bf19da6de2df8e78f" FOREIGN KEY ("meet_id") REFERENCES "meets"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "meets" ADD CONSTRAINT "FK_4db0db3ceda8ed2eb06f3349bbf" FOREIGN KEY ("history_now_id") REFERENCES "histories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "histories" ADD CONSTRAINT "FK_811b7b179cb1feedf0a93d21e56" FOREIGN KEY ("meet_id") REFERENCES "meets"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "histories" DROP CONSTRAINT "FK_811b7b179cb1feedf0a93d21e56"`);
        await queryRunner.query(`ALTER TABLE "meets" DROP CONSTRAINT "FK_4db0db3ceda8ed2eb06f3349bbf"`);
        await queryRunner.query(`ALTER TABLE "participants" DROP CONSTRAINT "FK_bb8a4d4502bf19da6de2df8e78f"`);
        await queryRunner.query(`ALTER TABLE "votes" DROP CONSTRAINT "FK_ae6e97b1b0e7dc4adc626cf0454"`);
        await queryRunner.query(`ALTER TABLE "votes" DROP CONSTRAINT "FK_b4e02499c3dae168ef83be12210"`);
        await queryRunner.query(`DROP TABLE "histories"`);
        await queryRunner.query(`DROP TABLE "meets"`);
        await queryRunner.query(`DROP TYPE "meets_status_enum"`);
        await queryRunner.query(`DROP TABLE "participants"`);
        await queryRunner.query(`DROP TABLE "votes"`);
    }

}
