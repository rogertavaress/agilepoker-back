import { MigrationInterface, QueryRunner } from 'typeorm';

// eslint-disable-next-line @typescript-eslint/class-name-casing
export default class createBase1621204372115 implements MigrationInterface {
  name = 'createBase1621204372115';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "votes" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "number" integer NOT NULL, "historyId" integer NOT NULL, "participantId" uuid NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_f3d9fd4a0af865152c3f59db8ff" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "participants" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "meetId" uuid NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_1cda06c31eec1c95b3365a0283f" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TYPE "meets_status_enum" AS ENUM('awaiting_sign', 'started', 'paused', 'finished')`,
    );
    await queryRunner.query(
      `CREATE TABLE "meets" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "email" character varying NOT NULL, "status" "meets_status_enum" NOT NULL DEFAULT 'awaiting_sign', "historyNowId" integer, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_898babae2f38d82cfa8b6070cf8" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "histories" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "category" character varying NOT NULL, "meetId" uuid NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_36b0e707452a8b674f9d95da743" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "votes" ADD CONSTRAINT "FK_8213c9d0fa76bfc3ff02d3cc1e3" FOREIGN KEY ("historyId") REFERENCES "histories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "votes" ADD CONSTRAINT "FK_d77c3bcf39a4e5cbe80594288f8" FOREIGN KEY ("participantId") REFERENCES "participants"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "participants" ADD CONSTRAINT "FK_95c8cf2f61999c4d47cb4561cdc" FOREIGN KEY ("meetId") REFERENCES "meets"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "meets" ADD CONSTRAINT "FK_6c3962909c170f5b8089bed2625" FOREIGN KEY ("historyNowId") REFERENCES "histories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "histories" ADD CONSTRAINT "FK_cd7694efb7ce81afe6ea8818727" FOREIGN KEY ("meetId") REFERENCES "meets"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "histories" DROP CONSTRAINT "FK_cd7694efb7ce81afe6ea8818727"`,
    );
    await queryRunner.query(
      `ALTER TABLE "meets" DROP CONSTRAINT "FK_6c3962909c170f5b8089bed2625"`,
    );
    await queryRunner.query(
      `ALTER TABLE "participants" DROP CONSTRAINT "FK_95c8cf2f61999c4d47cb4561cdc"`,
    );
    await queryRunner.query(
      `ALTER TABLE "votes" DROP CONSTRAINT "FK_d77c3bcf39a4e5cbe80594288f8"`,
    );
    await queryRunner.query(
      `ALTER TABLE "votes" DROP CONSTRAINT "FK_8213c9d0fa76bfc3ff02d3cc1e3"`,
    );
    await queryRunner.query(`DROP TABLE "histories"`);
    await queryRunner.query(`DROP TABLE "meets"`);
    await queryRunner.query(`DROP TYPE "meets_status_enum"`);
    await queryRunner.query(`DROP TABLE "participants"`);
    await queryRunner.query(`DROP TABLE "votes"`);
  }
}
