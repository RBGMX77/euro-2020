<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20210531065715 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE bets DROP FOREIGN KEY bets_ibfk_1');
        $this->addSql('DROP INDEX user_id ON bets');
        $this->addSql('ALTER TABLE bets ADD hometeam VARCHAR(255) DEFAULT NULL, ADD awayteam VARCHAR(255) DEFAULT NULL');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE bets DROP hometeam, DROP awayteam');
        $this->addSql('ALTER TABLE bets ADD CONSTRAINT bets_ibfk_1 FOREIGN KEY (user_id) REFERENCES user (id)');
        $this->addSql('CREATE INDEX user_id ON bets (user_id)');
    }
}
