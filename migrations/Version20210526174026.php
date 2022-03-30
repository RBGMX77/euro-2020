<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20210526174026 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE bets ADD user_id INT DEFAULT NULL, ADD bet_date DATE DEFAULT NULL, CHANGE homescore homescore INT NOT NULL, CHANGE awayscore awayscore INT NOT NULL, CHANGE match_id match_id INT NOT NULL, CHANGE bet_id bet_id VARCHAR(255) NOT NULL');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE bets DROP user_id, DROP bet_date, CHANGE homescore homescore INT DEFAULT NULL, CHANGE awayscore awayscore INT DEFAULT NULL, CHANGE match_id match_id INT DEFAULT NULL, CHANGE bet_id bet_id VARCHAR(255) CHARACTER SET utf8mb4 DEFAULT NULL COLLATE `utf8mb4_unicode_ci`');
    }
}
