import {MigrationInterface, QueryRunner} from "typeorm";

export class locationUpdateTypeFeature1624494078381 implements MigrationInterface {
    name = 'locationUpdateTypeFeature1624494078381'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "participants" DROP COLUMN "longitude"`);
        await queryRunner.query(`ALTER TABLE "participants" ADD "longitude" double precision`);
        await queryRunner.query(`ALTER TABLE "participants" DROP COLUMN "latitude"`);
        await queryRunner.query(`ALTER TABLE "participants" ADD "latitude" double precision`);
        await queryRunner.query(`ALTER TABLE "participants" DROP COLUMN "altitude"`);
        await queryRunner.query(`ALTER TABLE "participants" ADD "altitude" double precision`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "participants" DROP COLUMN "altitude"`);
        await queryRunner.query(`ALTER TABLE "participants" ADD "altitude" integer`);
        await queryRunner.query(`ALTER TABLE "participants" DROP COLUMN "latitude"`);
        await queryRunner.query(`ALTER TABLE "participants" ADD "latitude" integer`);
        await queryRunner.query(`ALTER TABLE "participants" DROP COLUMN "longitude"`);
        await queryRunner.query(`ALTER TABLE "participants" ADD "longitude" integer`);
    }

}
