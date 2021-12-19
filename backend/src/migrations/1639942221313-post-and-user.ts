import { MigrationInterface, QueryRunner } from 'typeorm';

export class postAndUser1639942221313 implements MigrationInterface {
    name = 'postAndUser1639942221313';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `CREATE TABLE \`person\` (\`id\` int NOT NULL AUTO_INCREMENT, \`username\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), UNIQUE INDEX \`IDX_e4475bde6806df5ab6999b47e5\` (\`username\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`
        );
        await queryRunner.query(
            `CREATE TABLE \`post\` (\`id\` int NOT NULL AUTO_INCREMENT, \`title\` varchar(255) NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE \`post\``);
        await queryRunner.query(
            `DROP INDEX \`IDX_e4475bde6806df5ab6999b47e5\` ON \`person\``
        );
        await queryRunner.query(`DROP TABLE \`person\``);
    }
}
