import { MigrationInterface, QueryRunner } from "typeorm";

export class AddAppointments1711251941085 implements MigrationInterface {
    name = 'AddAppointments1711251941085'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`patients_physiotherapists\` DROP FOREIGN KEY \`FK_18ad91b7aadb39ec9b0d4bcb98c\``);
        await queryRunner.query(`ALTER TABLE \`patients_physiotherapists\` DROP FOREIGN KEY \`FK_ad53b5493beb6fa158decb0fdab\``);
        await queryRunner.query(`CREATE TABLE \`appointments\` (\`id\` varchar(36) NOT NULL, \`physiotherapistId\` varchar(255) NOT NULL, \`patientId\` varchar(255) NOT NULL, \`activies\` varchar(255) NULL, \`notes\` varchar(255) NULL, \`comments\` varchar(255) NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`calendarId\` varchar(36) NULL, UNIQUE INDEX \`REL_d3ff65ff81f9694b328cf9e9a8\` (\`calendarId\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`calendars\` ADD \`appointmentId\` varchar(36) NULL`);
        await queryRunner.query(`ALTER TABLE \`calendars\` ADD UNIQUE INDEX \`IDX_6e466e148338c05f9facccf554\` (\`appointmentId\`)`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`REL_6e466e148338c05f9facccf554\` ON \`calendars\` (\`appointmentId\`)`);
        await queryRunner.query(`ALTER TABLE \`calendars\` ADD CONSTRAINT \`FK_6e466e148338c05f9facccf5548\` FOREIGN KEY (\`appointmentId\`) REFERENCES \`appointments\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`appointments\` ADD CONSTRAINT \`FK_d3ff65ff81f9694b328cf9e9a8c\` FOREIGN KEY (\`calendarId\`) REFERENCES \`calendars\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`patients_physiotherapists\` ADD CONSTRAINT \`FK_ad53b5493beb6fa158decb0fdab\` FOREIGN KEY (\`physiotherapist_id\`) REFERENCES \`physiotherapists\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`patients_physiotherapists\` ADD CONSTRAINT \`FK_18ad91b7aadb39ec9b0d4bcb98c\` FOREIGN KEY (\`patient_id\`) REFERENCES \`patients\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`patients_physiotherapists\` DROP FOREIGN KEY \`FK_18ad91b7aadb39ec9b0d4bcb98c\``);
        await queryRunner.query(`ALTER TABLE \`patients_physiotherapists\` DROP FOREIGN KEY \`FK_ad53b5493beb6fa158decb0fdab\``);
        await queryRunner.query(`ALTER TABLE \`appointments\` DROP FOREIGN KEY \`FK_d3ff65ff81f9694b328cf9e9a8c\``);
        await queryRunner.query(`ALTER TABLE \`calendars\` DROP FOREIGN KEY \`FK_6e466e148338c05f9facccf5548\``);
        await queryRunner.query(`DROP INDEX \`REL_6e466e148338c05f9facccf554\` ON \`calendars\``);
        await queryRunner.query(`ALTER TABLE \`calendars\` DROP INDEX \`IDX_6e466e148338c05f9facccf554\``);
        await queryRunner.query(`ALTER TABLE \`calendars\` DROP COLUMN \`appointmentId\``);
        await queryRunner.query(`DROP INDEX \`REL_d3ff65ff81f9694b328cf9e9a8\` ON \`appointments\``);
        await queryRunner.query(`DROP TABLE \`appointments\``);
        await queryRunner.query(`ALTER TABLE \`patients_physiotherapists\` ADD CONSTRAINT \`FK_ad53b5493beb6fa158decb0fdab\` FOREIGN KEY (\`physiotherapist_id\`) REFERENCES \`physiotherapists\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`patients_physiotherapists\` ADD CONSTRAINT \`FK_18ad91b7aadb39ec9b0d4bcb98c\` FOREIGN KEY (\`patient_id\`) REFERENCES \`patients\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
