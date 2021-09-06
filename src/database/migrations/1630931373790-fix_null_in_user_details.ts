import {MigrationInterface, QueryRunner} from "typeorm";

export class fixNullInUserDetails1630931373790 implements MigrationInterface {
    name = 'fixNullInUserDetails1630931373790'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."users_details" ALTER COLUMN "name" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "public"."users_details" ALTER COLUMN "lastname" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "public"."users_details" ALTER COLUMN "created_at" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "public"."users_details" ALTER COLUMN "updated_at" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."users_details" ALTER COLUMN "updated_at" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "public"."users_details" ALTER COLUMN "created_at" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "public"."users_details" ALTER COLUMN "lastname" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "public"."users_details" ALTER COLUMN "name" SET NOT NULL`);
    }

}
