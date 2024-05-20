import { MigrationInterface, QueryRunner } from "typeorm";

export class AddCalendars1711065190029 implements MigrationInterface {
    name = 'AddCalendars1711065190029'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`patients_physiotherapists\` DROP FOREIGN KEY \`FK_18ad91b7aadb39ec9b0d4bcb98c\``);
        await queryRunner.query(`ALTER TABLE \`patients_physiotherapists\` DROP FOREIGN KEY \`FK_ad53b5493beb6fa158decb0fdab\``);
        await queryRunner.query(`CREATE TABLE \`calendars\` (\`id\` varchar(36) NOT NULL, \`date\` varchar(255) NOT NULL, \`time\` varchar(255) NOT NULL, \`available\` varchar(255) NOT NULL DEFAULT 'LIVRE', \`duration\` varchar(255) NOT NULL DEFAULT '60', \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`physiotherapistId\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`calendars\` ADD CONSTRAINT \`FK_3ff9f5081baba45d5aad4d30dfa\` FOREIGN KEY (\`physiotherapistId\`) REFERENCES \`physiotherapists\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`patients_physiotherapists\` ADD CONSTRAINT \`FK_ad53b5493beb6fa158decb0fdab\` FOREIGN KEY (\`physiotherapist_id\`) REFERENCES \`physiotherapists\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`patients_physiotherapists\` ADD CONSTRAINT \`FK_18ad91b7aadb39ec9b0d4bcb98c\` FOREIGN KEY (\`patient_id\`) REFERENCES \`patients\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`patients_physiotherapists\` DROP FOREIGN KEY \`FK_18ad91b7aadb39ec9b0d4bcb98c\``);
        await queryRunner.query(`ALTER TABLE \`patients_physiotherapists\` DROP FOREIGN KEY \`FK_ad53b5493beb6fa158decb0fdab\``);
        await queryRunner.query(`ALTER TABLE \`calendars\` DROP FOREIGN KEY \`FK_3ff9f5081baba45d5aad4d30dfa\``);
        await queryRunner.query(`DROP TABLE \`calendars\``);
        await queryRunner.query(`ALTER TABLE \`patients_physiotherapists\` ADD CONSTRAINT \`FK_ad53b5493beb6fa158decb0fdab\` FOREIGN KEY (\`physiotherapist_id\`) REFERENCES \`physiotherapists\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`patients_physiotherapists\` ADD CONSTRAINT \`FK_18ad91b7aadb39ec9b0d4bcb98c\` FOREIGN KEY (\`patient_id\`) REFERENCES \`patients\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
