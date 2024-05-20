import { MigrationInterface, QueryRunner } from "typeorm";

export class AddContact1715341834305 implements MigrationInterface {
    name = 'AddContact1715341834305'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`patients_physiotherapists\` DROP FOREIGN KEY \`FK_18ad91b7aadb39ec9b0d4bcb98c\``);
        await queryRunner.query(`ALTER TABLE \`patients_physiotherapists\` DROP FOREIGN KEY \`FK_ad53b5493beb6fa158decb0fdab\``);
        await queryRunner.query(`DROP INDEX \`IDX_6e466e148338c05f9facccf554\` ON \`calendars\``);
        await queryRunner.query(`CREATE TABLE \`contact\` (\`id\` varchar(36) NOT NULL, \`name\` varchar(255) NOT NULL, \`email\` varchar(255) NOT NULL, \`message\` text NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`users\` ADD \`owner\` tinyint NOT NULL DEFAULT 0`);
        await queryRunner.query(`ALTER TABLE \`patients_physiotherapists\` ADD CONSTRAINT \`FK_ad53b5493beb6fa158decb0fdab\` FOREIGN KEY (\`physiotherapist_id\`) REFERENCES \`physiotherapists\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`patients_physiotherapists\` ADD CONSTRAINT \`FK_18ad91b7aadb39ec9b0d4bcb98c\` FOREIGN KEY (\`patient_id\`) REFERENCES \`patients\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`patients_physiotherapists\` DROP FOREIGN KEY \`FK_18ad91b7aadb39ec9b0d4bcb98c\``);
        await queryRunner.query(`ALTER TABLE \`patients_physiotherapists\` DROP FOREIGN KEY \`FK_ad53b5493beb6fa158decb0fdab\``);
        await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`owner\``);
        await queryRunner.query(`DROP TABLE \`contact\``);
        await queryRunner.query(`CREATE UNIQUE INDEX \`IDX_6e466e148338c05f9facccf554\` ON \`calendars\` (\`appointmentId\`)`);
        await queryRunner.query(`ALTER TABLE \`patients_physiotherapists\` ADD CONSTRAINT \`FK_ad53b5493beb6fa158decb0fdab\` FOREIGN KEY (\`physiotherapist_id\`) REFERENCES \`physiotherapists\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`patients_physiotherapists\` ADD CONSTRAINT \`FK_18ad91b7aadb39ec9b0d4bcb98c\` FOREIGN KEY (\`patient_id\`) REFERENCES \`patients\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
