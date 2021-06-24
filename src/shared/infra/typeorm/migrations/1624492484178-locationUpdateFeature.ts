import {MigrationInterface, QueryRunner} from "typeorm";

export class locationUpdateFeature1624492484178 implements MigrationInterface {
    name = 'locationUpdateFeature1624492484178'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "participants" ADD "altitude" integer`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "participants" DROP COLUMN "altitude"`);
    }

}
