import { MigrationInterface, QueryRunner } from "typeorm";

export class AddActivities1716315603476 implements MigrationInterface {
    name = 'AddActivities1716315603476'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`patients_physiotherapists\` DROP FOREIGN KEY \`FK_18ad91b7aadb39ec9b0d4bcb98c\``);
        await queryRunner.query(`ALTER TABLE \`patients_physiotherapists\` DROP FOREIGN KEY \`FK_ad53b5493beb6fa158decb0fdab\``);
        await queryRunner.query(`CREATE TABLE \`activities\` (\`id\` varchar(36) NOT NULL, \`title\` varchar(255) NOT NULL, \`titleUrl\` varchar(255) NOT NULL, \`content\` longtext NOT NULL, \`url\` varchar(255) NOT NULL, \`status\` tinyint NOT NULL DEFAULT 1, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, UNIQUE INDEX \`IDX_13ed6c247f66cc50e29ebec1da\` (\`title\`), UNIQUE INDEX \`IDX_730fa66817a0cdd85ce1b90109\` (\`titleUrl\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`blog\` ADD \`titleUrl\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`blog\` ADD UNIQUE INDEX \`IDX_b00ca4257235d75cfbcf65d752\` (\`titleUrl\`)`);
        await queryRunner.query(`ALTER TABLE \`blog\` ADD UNIQUE INDEX \`IDX_1e1fe0ab7604236fc490c25fd0\` (\`title\`)`);
        await queryRunner.query(`ALTER TABLE \`patients_physiotherapists\` ADD CONSTRAINT \`FK_ad53b5493beb6fa158decb0fdab\` FOREIGN KEY (\`physiotherapist_id\`) REFERENCES \`physiotherapists\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`patients_physiotherapists\` ADD CONSTRAINT \`FK_18ad91b7aadb39ec9b0d4bcb98c\` FOREIGN KEY (\`patient_id\`) REFERENCES \`patients\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`patients_physiotherapists\` DROP FOREIGN KEY \`FK_18ad91b7aadb39ec9b0d4bcb98c\``);
        await queryRunner.query(`ALTER TABLE \`patients_physiotherapists\` DROP FOREIGN KEY \`FK_ad53b5493beb6fa158decb0fdab\``);
        await queryRunner.query(`ALTER TABLE \`blog\` DROP INDEX \`IDX_1e1fe0ab7604236fc490c25fd0\``);
        await queryRunner.query(`ALTER TABLE \`blog\` DROP INDEX \`IDX_b00ca4257235d75cfbcf65d752\``);
        await queryRunner.query(`ALTER TABLE \`blog\` DROP COLUMN \`titleUrl\``);
        await queryRunner.query(`DROP INDEX \`IDX_730fa66817a0cdd85ce1b90109\` ON \`activities\``);
        await queryRunner.query(`DROP INDEX \`IDX_13ed6c247f66cc50e29ebec1da\` ON \`activities\``);
        await queryRunner.query(`DROP TABLE \`activities\``);
        await queryRunner.query(`ALTER TABLE \`patients_physiotherapists\` ADD CONSTRAINT \`FK_ad53b5493beb6fa158decb0fdab\` FOREIGN KEY (\`physiotherapist_id\`) REFERENCES \`physiotherapists\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`patients_physiotherapists\` ADD CONSTRAINT \`FK_18ad91b7aadb39ec9b0d4bcb98c\` FOREIGN KEY (\`patient_id\`) REFERENCES \`patients\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
