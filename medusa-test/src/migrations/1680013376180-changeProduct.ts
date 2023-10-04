// reference = step 4 - https://docs.medusajs.com/development/entities/extend-entity
import { MigrationInterface, QueryRunner } from "typeorm"

class changeProduct1680013376180 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            "ALTER TABLE \"product\"" +
            " ADD COLUMN \"customAttribute\" text"
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            "ALTER TABLE \"product\" DROP COLUMN \"customAttribute\""
        )
    }
}

