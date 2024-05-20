import { MigrationInterface, QueryRunner } from "typeorm";

export class AddRelationPatientPhysiotherapists1710858778748 implements MigrationInterface {
    name = 'AddRelationPatientPhysiotherapists1710858778748'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`patients_physiotherapists\` (\`physiotherapist_id\` varchar(36) NOT NULL, \`patient_id\` varchar(36) NOT NULL, INDEX \`IDX_ad53b5493beb6fa158decb0fda\` (\`physiotherapist_id\`), INDEX \`IDX_18ad91b7aadb39ec9b0d4bcb98\` (\`patient_id\`), PRIMARY KEY (\`physiotherapist_id\`, \`patient_id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`patients_physiotherapists\` ADD CONSTRAINT \`FK_ad53b5493beb6fa158decb0fdab\` FOREIGN KEY (\`physiotherapist_id\`) REFERENCES \`physiotherapists\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`patients_physiotherapists\` ADD CONSTRAINT \`FK_18ad91b7aadb39ec9b0d4bcb98c\` FOREIGN KEY (\`patient_id\`) REFERENCES \`patients\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`patients_physiotherapists\` DROP FOREIGN KEY \`FK_18ad91b7aadb39ec9b0d4bcb98c\``);
        await queryRunner.query(`ALTER TABLE \`patients_physiotherapists\` DROP FOREIGN KEY \`FK_ad53b5493beb6fa158decb0fdab\``);
        await queryRunner.query(`DROP INDEX \`IDX_18ad91b7aadb39ec9b0d4bcb98\` ON \`patients_physiotherapists\``);
        await queryRunner.query(`DROP INDEX \`IDX_ad53b5493beb6fa158decb0fda\` ON \`patients_physiotherapists\``);
        await queryRunner.query(`DROP TABLE \`patients_physiotherapists\``);
    }

}
