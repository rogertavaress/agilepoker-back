import {MigrationInterface, QueryRunner} from "typeorm";

export class locationAndTimeFeature1623524917750 implements MigrationInterface {
    name = 'locationAndTimeFeature1623524917750'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "participants" ADD "longitude" integer`);
        await queryRunner.query(`ALTER TABLE "participants" ADD "latitude" integer`);
        await queryRunner.query(`ALTER TABLE "histories" ADD "time" integer NOT NULL DEFAULT 0`);
        await queryRunner.query(`ALTER TABLE "histories" ADD "time_parsed" character varying NOT NULL DEFAULT ''`);
        await queryRunner.query(`ALTER TABLE "votes" DROP CONSTRAINT "FK_8213c9d0fa76bfc3ff02d3cc1e3"`);
        await queryRunner.query(`ALTER TABLE "votes" DROP COLUMN "historyId"`);
        await queryRunner.query(`ALTER TABLE "votes" ADD "historyId" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "votes" DROP COLUMN "created_at"`);
        await queryRunner.query(`ALTER TABLE "votes" ADD "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "votes" DROP COLUMN "updated_at"`);
        await queryRunner.query(`ALTER TABLE "votes" ADD "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "participants" DROP COLUMN "created_at"`);
        await queryRunner.query(`ALTER TABLE "participants" ADD "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "participants" DROP COLUMN "updated_at"`);
        await queryRunner.query(`ALTER TABLE "participants" ADD "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "meets" DROP CONSTRAINT "FK_6c3962909c170f5b8089bed2625"`);
        await queryRunner.query(`ALTER TYPE "public"."meets_status_enum" RENAME TO "meets_status_enum_old"`);
        await queryRunner.query(`CREATE TYPE "meets_status_enum" AS ENUM('awaiting_sign', 'started', 'played', 'paused', 'finished')`);
        await queryRunner.query(`ALTER TABLE "meets" ALTER COLUMN "status" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "meets" ALTER COLUMN "status" TYPE "meets_status_enum" USING "status"::"text"::"meets_status_enum"`);
        await queryRunner.query(`ALTER TABLE "meets" ALTER COLUMN "status" SET DEFAULT 'awaiting_sign'`);
        await queryRunner.query(`DROP TYPE "meets_status_enum_old"`);
        await queryRunner.query(`ALTER TABLE "meets" DROP COLUMN "historyNowId"`);
        await queryRunner.query(`ALTER TABLE "meets" ADD "historyNowId" uuid`);
        await queryRunner.query(`ALTER TABLE "meets" DROP COLUMN "created_at"`);
        await queryRunner.query(`ALTER TABLE "meets" ADD "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "meets" DROP COLUMN "updated_at"`);
        await queryRunner.query(`ALTER TABLE "meets" ADD "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "histories" DROP CONSTRAINT "PK_36b0e707452a8b674f9d95da743"`);
        await queryRunner.query(`ALTER TABLE "histories" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "histories" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "histories" ADD CONSTRAINT "PK_36b0e707452a8b674f9d95da743" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "histories" DROP COLUMN "created_at"`);
        await queryRunner.query(`ALTER TABLE "histories" ADD "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "histories" DROP COLUMN "updated_at"`);
        await queryRunner.query(`ALTER TABLE "histories" ADD "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "votes" ADD CONSTRAINT "FK_8213c9d0fa76bfc3ff02d3cc1e3" FOREIGN KEY ("historyId") REFERENCES "histories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "meets" ADD CONSTRAINT "FK_6c3962909c170f5b8089bed2625" FOREIGN KEY ("historyNowId") REFERENCES "histories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "meets" DROP CONSTRAINT "FK_6c3962909c170f5b8089bed2625"`);
        await queryRunner.query(`ALTER TABLE "votes" DROP CONSTRAINT "FK_8213c9d0fa76bfc3ff02d3cc1e3"`);
        await queryRunner.query(`ALTER TABLE "histories" DROP COLUMN "updated_at"`);
        await queryRunner.query(`ALTER TABLE "histories" ADD "updated_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "histories" DROP COLUMN "created_at"`);
        await queryRunner.query(`ALTER TABLE "histories" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "histories" DROP CONSTRAINT "PK_36b0e707452a8b674f9d95da743"`);
        await queryRunner.query(`ALTER TABLE "histories" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "histories" ADD "id" SERIAL NOT NULL`);
        await queryRunner.query(`ALTER TABLE "histories" ADD CONSTRAINT "PK_36b0e707452a8b674f9d95da743" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "meets" DROP COLUMN "updated_at"`);
        await queryRunner.query(`ALTER TABLE "meets" ADD "updated_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "meets" DROP COLUMN "created_at"`);
        await queryRunner.query(`ALTER TABLE "meets" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "meets" DROP COLUMN "historyNowId"`);
        await queryRunner.query(`ALTER TABLE "meets" ADD "historyNowId" integer`);
        await queryRunner.query(`CREATE TYPE "meets_status_enum_old" AS ENUM('awaiting_sign', 'started', 'paused', 'finished')`);
        await queryRunner.query(`ALTER TABLE "meets" ALTER COLUMN "status" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "meets" ALTER COLUMN "status" TYPE "meets_status_enum_old" USING "status"::"text"::"meets_status_enum_old"`);
        await queryRunner.query(`ALTER TABLE "meets" ALTER COLUMN "status" SET DEFAULT 'awaiting_sign'`);
        await queryRunner.query(`DROP TYPE "meets_status_enum"`);
        await queryRunner.query(`ALTER TYPE "meets_status_enum_old" RENAME TO  "meets_status_enum"`);
        await queryRunner.query(`ALTER TABLE "meets" ADD CONSTRAINT "FK_6c3962909c170f5b8089bed2625" FOREIGN KEY ("historyNowId") REFERENCES "histories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "participants" DROP COLUMN "updated_at"`);
        await queryRunner.query(`ALTER TABLE "participants" ADD "updated_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "participants" DROP COLUMN "created_at"`);
        await queryRunner.query(`ALTER TABLE "participants" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "votes" DROP COLUMN "updated_at"`);
        await queryRunner.query(`ALTER TABLE "votes" ADD "updated_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "votes" DROP COLUMN "created_at"`);
        await queryRunner.query(`ALTER TABLE "votes" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "votes" DROP COLUMN "historyId"`);
        await queryRunner.query(`ALTER TABLE "votes" ADD "historyId" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "votes" ADD CONSTRAINT "FK_8213c9d0fa76bfc3ff02d3cc1e3" FOREIGN KEY ("historyId") REFERENCES "histories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "histories" DROP COLUMN "time_parsed"`);
        await queryRunner.query(`ALTER TABLE "histories" DROP COLUMN "time"`);
        await queryRunner.query(`ALTER TABLE "participants" DROP COLUMN "latitude"`);
        await queryRunner.query(`ALTER TABLE "participants" DROP COLUMN "longitude"`);
    }

}
