import { MigrationInterface, QueryRunner } from "typeorm";

export class AddTypeCashFinance1721919246517 implements MigrationInterface {
    name = 'AddTypeCashFinance1721919246517'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`cash\` ADD \`owner\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`cash\` ADD \`id_owner\` varchar(255) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`cash\` DROP COLUMN \`id_owner\``);
        await queryRunner.query(`ALTER TABLE \`cash\` DROP COLUMN \`owner\``);
    }

}
