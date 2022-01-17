import { MigrationInterface, QueryRunner } from 'typeorm';

export class userCount1642425939057 implements MigrationInterface {
    name = 'userCount1642425939057';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE \`person\` ADD \`count\` int NOT NULL`
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`person\` DROP COLUMN \`count\``);
    }
}
