import { MigrationInterface, QueryRunner } from "typeorm";

export class StartUsers1710811575265 implements MigrationInterface {
    name = 'StartUsers1710811575265'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`admins\` (\`id\` varchar(36) NOT NULL, \`permission\` varchar(255) NOT NULL DEFAULT 'Admin', \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`usersId\` varchar(36) NULL, UNIQUE INDEX \`REL_3a975e3d8875fd79a50901ded0\` (\`usersId\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`patients\` (\`id\` varchar(36) NOT NULL, \`phone\` varchar(255) NULL, \`birth\` varchar(255) NOT NULL, \`sex\` varchar(255) NOT NULL DEFAULT 'NÃO INFORMADO', \`profession\` varchar(255) NULL, \`medical\` text NULL, \`lifestyle\` text NULL, \`condition\` text NOT NULL, \`comments\` varchar(255) NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`usersId\` varchar(36) NULL, UNIQUE INDEX \`REL_b005ef41d63bda60b0858c9379\` (\`usersId\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`users\` (\`id\` varchar(36) NOT NULL, \`name\` varchar(255) NOT NULL, \`email\` varchar(255) NOT NULL, \`password\` text NOT NULL, \`user_type\` varchar(255) NOT NULL DEFAULT 'Usuário', \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`adminId\` varchar(36) NULL, \`patientId\` varchar(36) NULL, \`physiotherapistId\` varchar(36) NULL, UNIQUE INDEX \`REL_dd44ce70ffde87b2f0e46b9896\` (\`adminId\`), UNIQUE INDEX \`REL_901039a35ef047c20cdb4b5209\` (\`patientId\`), UNIQUE INDEX \`REL_43b9b694e0c8c6a80252a650bf\` (\`physiotherapistId\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`physiotherapists\` (\`id\` varchar(36) NOT NULL, \`crefito\` varchar(255) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`usersId\` varchar(36) NULL, UNIQUE INDEX \`REL_991e9ffa67c6dbd407257343ac\` (\`usersId\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`admins\` ADD CONSTRAINT \`FK_3a975e3d8875fd79a50901ded07\` FOREIGN KEY (\`usersId\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`patients\` ADD CONSTRAINT \`FK_b005ef41d63bda60b0858c9379d\` FOREIGN KEY (\`usersId\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`users\` ADD CONSTRAINT \`FK_dd44ce70ffde87b2f0e46b98963\` FOREIGN KEY (\`adminId\`) REFERENCES \`admins\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`users\` ADD CONSTRAINT \`FK_901039a35ef047c20cdb4b52092\` FOREIGN KEY (\`patientId\`) REFERENCES \`patients\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`users\` ADD CONSTRAINT \`FK_43b9b694e0c8c6a80252a650bf3\` FOREIGN KEY (\`physiotherapistId\`) REFERENCES \`physiotherapists\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`physiotherapists\` ADD CONSTRAINT \`FK_991e9ffa67c6dbd407257343ac6\` FOREIGN KEY (\`usersId\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`physiotherapists\` DROP FOREIGN KEY \`FK_991e9ffa67c6dbd407257343ac6\``);
        await queryRunner.query(`ALTER TABLE \`users\` DROP FOREIGN KEY \`FK_43b9b694e0c8c6a80252a650bf3\``);
        await queryRunner.query(`ALTER TABLE \`users\` DROP FOREIGN KEY \`FK_901039a35ef047c20cdb4b52092\``);
        await queryRunner.query(`ALTER TABLE \`users\` DROP FOREIGN KEY \`FK_dd44ce70ffde87b2f0e46b98963\``);
        await queryRunner.query(`ALTER TABLE \`patients\` DROP FOREIGN KEY \`FK_b005ef41d63bda60b0858c9379d\``);
        await queryRunner.query(`ALTER TABLE \`admins\` DROP FOREIGN KEY \`FK_3a975e3d8875fd79a50901ded07\``);
        await queryRunner.query(`DROP INDEX \`REL_991e9ffa67c6dbd407257343ac\` ON \`physiotherapists\``);
        await queryRunner.query(`DROP TABLE \`physiotherapists\``);
        await queryRunner.query(`DROP INDEX \`REL_43b9b694e0c8c6a80252a650bf\` ON \`users\``);
        await queryRunner.query(`DROP INDEX \`REL_901039a35ef047c20cdb4b5209\` ON \`users\``);
        await queryRunner.query(`DROP INDEX \`REL_dd44ce70ffde87b2f0e46b9896\` ON \`users\``);
        await queryRunner.query(`DROP TABLE \`users\``);
        await queryRunner.query(`DROP INDEX \`REL_b005ef41d63bda60b0858c9379\` ON \`patients\``);
        await queryRunner.query(`DROP TABLE \`patients\``);
        await queryRunner.query(`DROP INDEX \`REL_3a975e3d8875fd79a50901ded0\` ON \`admins\``);
        await queryRunner.query(`DROP TABLE \`admins\``);
    }

}
