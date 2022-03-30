<?php

namespace App\Repository;

use App\Entity\Bets;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @method Bets|null find($id, $lockMode = null, $lockVersion = null)
 * @method Bets|null findOneBy(array $criteria, array $orderBy = null)
 * @method Bets[]    findAll()
 * @method Bets[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class BetsRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Bets::class);
    }

    // /**
    //  * @return Bets[] Returns an array of Bets objects
    //  */
    /*
    public function findByExampleField($value)
    {
        return $this->createQueryBuilder('b')
            ->andWhere('b.exampleField = :val')
            ->setParameter('val', $value)
            ->orderBy('b.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }
    */

    
    public function findBetsByUserAndMatch($userid,$matchid): ?Bets
    {
        return $this->createQueryBuilder('b')
            ->where('b.match_id = :matchid')
            ->andWhere('b.user_id = :userid')
            ->setParameter('matchid', $matchid)
            ->setParameter('userid', $userid)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }

    public function findBetsByUser($userid): ?Array
    {
        return $this->createQueryBuilder('b')
            ->Where('b.user_id = :userid')
            ->setParameter('userid', $userid)
            ->getQuery()
            ->getResult()
        ;
    }
    
}
