import { MigrationInterface, QueryRunner } from "typeorm";

export class AddFinances1716327098018 implements MigrationInterface {
    name = 'AddFinances1716327098018'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`patients_physiotherapists\` DROP FOREIGN KEY \`FK_18ad91b7aadb39ec9b0d4bcb98c\``);
        await queryRunner.query(`ALTER TABLE \`patients_physiotherapists\` DROP FOREIGN KEY \`FK_ad53b5493beb6fa158decb0fdab\``);
        await queryRunner.query(`CREATE TABLE \`cash\` (\`id\` varchar(36) NOT NULL, \`wallet\` varchar(255) NOT NULL, \`balance\` decimal(10,2) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`finances\` (\`id\` varchar(36) NOT NULL, \`financeType\` varchar(255) NOT NULL, \`financeCategory\` varchar(255) NOT NULL, \`financeDescription\` varchar(255) NOT NULL, \`value\` decimal(10,2) NOT NULL, \`transaction\` varchar(255) NOT NULL, \`financeDate\` datetime NOT NULL, \`status\` varchar(255) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`cashId\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`finances\` ADD CONSTRAINT \`FK_d271ddad35256d51e137940fcdb\` FOREIGN KEY (\`cashId\`) REFERENCES \`cash\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`patients_physiotherapists\` ADD CONSTRAINT \`FK_18ad91b7aadb39ec9b0d4bcb98c\` FOREIGN KEY (\`patient_id\`) REFERENCES \`patients\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`patients_physiotherapists\` ADD CONSTRAINT \`FK_ad53b5493beb6fa158decb0fdab\` FOREIGN KEY (\`physiotherapist_id\`) REFERENCES \`physiotherapists\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`patients_physiotherapists\` DROP FOREIGN KEY \`FK_ad53b5493beb6fa158decb0fdab\``);
        await queryRunner.query(`ALTER TABLE \`patients_physiotherapists\` DROP FOREIGN KEY \`FK_18ad91b7aadb39ec9b0d4bcb98c\``);
        await queryRunner.query(`ALTER TABLE \`finances\` DROP FOREIGN KEY \`FK_d271ddad35256d51e137940fcdb\``);
        await queryRunner.query(`DROP TABLE \`finances\``);
        await queryRunner.query(`DROP TABLE \`cash\``);
        await queryRunner.query(`ALTER TABLE \`patients_physiotherapists\` ADD CONSTRAINT \`FK_ad53b5493beb6fa158decb0fdab\` FOREIGN KEY (\`physiotherapist_id\`) REFERENCES \`physiotherapists\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`patients_physiotherapists\` ADD CONSTRAINT \`FK_18ad91b7aadb39ec9b0d4bcb98c\` FOREIGN KEY (\`patient_id\`) REFERENCES \`patients\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
