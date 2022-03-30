<?php

namespace App\Entity;

use App\Repository\BetsRepository;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass=BetsRepository::class)
 */
class Bets
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="integer")
     */
    private $homescore;

    /**
     * @ORM\Column(type="integer")
     */
    private $awayscore;

    /**
     * @ORM\Column(type="integer")
     */
    private $match_id;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $bet_id;

    /**
     * @ORM\Column(type="integer", nullable=true)
     */
    private $user_id;

    /**
     * @ORM\Column(type="date", nullable=true)
     */
    private $bet_date;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $hometeam;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $awayteam;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getHomescore(): ?int
    {
        return $this->homescore;
    }

    public function setHomescore(int $homescore): self
    {
        $this->homescore = $homescore;

        return $this;
    }

    public function getAwayscore(): ?int
    {
        return $this->awayscore;
    }

    public function setAwayscore(int $awayscore): self
    {
        $this->awayscore = $awayscore;

        return $this;
    }

    public function getMatchId(): ?int
    {
        return $this->match_id;
    }

    public function setMatchId(int $match_id): self
    {
        $this->match_id = $match_id;

        return $this;
    }

    public function getBetId(): ?string
    {
        return $this->bet_id;
    }

    public function setBetId(string $bet_id): self
    {
        $this->bet_id = $bet_id;

        return $this;
    }

    public function getUserId(): ?int
    {
        return $this->user_id;
    }

    public function setUserId(?int $user_id): self
    {
        $this->user_id = $user_id;

        return $this;
    }

    public function getBetDate(): ?\DateTimeInterface
    {
        return $this->bet_date;
    }

    public function setBetDate(?\DateTimeInterface $bet_date): self
    {
        $this->bet_date = $bet_date;

        return $this;
    }

    public function getHometeam(): ?string
    {
        return $this->hometeam;
    }

    public function setHometeam(?string $hometeam): self
    {
        $this->hometeam = $hometeam;

        return $this;
    }

    public function getAwayteam(): ?string
    {
        return $this->awayteam;
    }

    public function setAwayteam(?string $awayteam): self
    {
        $this->awayteam = $awayteam;

        return $this;
    }
}
