import { MigrationInterface, QueryRunner } from 'typeorm';

export class userCountDefault1642426963990 implements MigrationInterface {
    name = 'userCountDefault1642426963990';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE \`person\` CHANGE \`count\` \`count\` int NOT NULL DEFAULT '0'`
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE \`person\` CHANGE \`count\` \`count\` int NOT NULL`
        );
    }
}
