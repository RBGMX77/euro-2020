<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\JsonResponse;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\Security\Core\User\UserInterface;

use App\Repository\UserRepository;
use App\Repository\BetsRepository;

use App\Entity\Bets;
use App\Entity\User;

class HomeController extends AbstractController
{
    /**
    * @Route("/{reactRouting}", name="home", defaults={"reactRouting": null})
    */
    public function index(): Response
    {   

        return $this->render('home/index.html.twig');
    }

    /**
     * @Route("/api/getUserId", name="getuserid")
     * @return \Symfony\Component\HttpFoundation\JsonResponse
     */
    public function getUserid(UserInterface $user){
        $id = $user->getId();
        return new JsonResponse($id);
    }

    /**
     * @Route("/api/getUserName", name="getusername")
     * @return \Symfony\Component\HttpFoundation\JsonResponse
     */
    public function getUserName(Request $request , UserRepository $userRepository){

        if ($request->isXmlHttpRequest()){
            $postData = json_decode($request->getContent());
            $req_username = $postData->username;
            $users = $userRepository->findAll();
            $userarray = [];
            foreach ($users as $user){
                $username = $user->getUsername();
                array_push($userarray,$username);
            }        
            if(in_array($req_username,$userarray)){
                return new JsonResponse(['user' => $req_username]);
            }
            else{
                return new JsonResponse();
            }
        }
    }

    /**
     * @Route("/api/postbets", name="postbets")
     * @return \Symfony\Component\HttpFoundation\JsonResponse
     */
    public function setBets(Request $request , UserInterface $user){

        if ($request->isXmlHttpRequest()){
            $postData = json_decode($request->getContent());
            $homescore = $postData->homescore;
            $awayscore = $postData->awayscore;
            $matchid = $postData->matchid;
            $betid = $postData->betid;
            $id = $user->getId();
            $hometeam = $postData->hometeam;
            $awayteam = $postData->awayteam;
            $date = new \DateTime('@'.strtotime('now'));
            $entityManager = $this->getDoctrine()->getManager();
            $bet = new Bets();
            $bet->setHomescore($homescore);
            $bet->setAwayscore($awayscore);
            $bet->setMatchId($matchid);
            $bet->setBetId($betid);
            $bet->setUserId($id);
            $bet->setBetDate($date);
            $bet->setHometeam($hometeam);
            $bet->setAwayteam($awayteam);
            $entityManager->persist($bet);
            $entityManager->flush();
            return new JsonResponse('ok');
        }
        else {
            return $this->redirectToRoute('home');
        }
    }

    /**
     * @Route("/api/updatebets", name="updatebets")
     * @return \Symfony\Component\HttpFoundation\JsonResponse
     */
    public function updateBets(Request $request , UserInterface $user){
        if ($request->isXmlHttpRequest()){
            $postData = json_decode($request->getContent());
            $homescore = $postData->homescore;
            $awayscore = $postData->awayscore;
            $matchid = $postData->matchid;
            $id = $user->getId();
            $entityManager = $this->getDoctrine()->getManager();
            $bet = $entityManager->getRepository(Bets::class)->findOneBy(array('match_id' =>$matchid,'user_id'=>$id));
            $bet->setHomescore($homescore);  
            $bet->setAwayscore($awayscore); 
            $entityManager->flush(); 

            return new JsonResponse(['message' => 'Le pronostic a bien été modifié!']);
        }
        else {
            return $this->redirectToRoute('home');
        }
    }

    /**
     * @Route("/api/getbets", name="getbets")
     * @return \Symfony\Component\HttpFoundation\JsonResponse
     */
    public function getBets(Request $request , UserInterface $user){

        if ($request->isXmlHttpRequest()){
            $postData = json_decode($request->getContent());
            $userid = $postData->userid;
            $matchid = $postData->matchid;
            $bets = $this->getDoctrine()
                ->getRepository(Bets::class)
                ->findBetsByUserAndMatch($userid,$matchid);
            if($bets !== null){
                $homescore = $bets->getHomescore();
                $awayscore = $bets->getAwayscore();
                return new JsonResponse(['homescore' => $homescore , 'awayscore' => $awayscore]);
            }
            else{
                return new JsonResponse(null);
            }
        }
        else {
            return $this->redirectToRoute('home');
        }
    }
    /**
     * @Route("/api/getbetsByUser", name="getbetsbyuser")
     * @return \Symfony\Component\HttpFoundation\JsonResponse
     */
    public function getbetsByUser(Request $request , UserInterface $user){

        $postData = json_decode($request->getContent());
        $userid = $postData->id;

        $bets = $this->getDoctrine()
            ->getRepository(Bets::class)
            ->findBetsByUser($userid);
        $match = [];
        $betsarray = [];
        if($bets !== null){
            for ($i = 0 ; $i < count($bets) ; $i++){
                $homescore = $bets[$i]->getHomescore();
                $awayscore = $bets[$i]->getAwayscore();
                $bet_id = $bets[$i]->getBetId();
                $match_id = $bets[$i]->getMatchId();
                $bet_date = $bets[$i]->getBetDate();
                $hometeam = $bets[$i]->getHometeam();
                $awayteam = $bets[$i]->getAwayteam();
                $match = ['homescore' => $homescore,
                          'awayscore' => $awayscore,
                          'bet_id' => $bet_id,
                          'match_id' => $match_id,
                          'bet_date' =>$bet_date,
                          'hometeam' => $hometeam,
                          'awayteam' => $awayteam];
                array_push($betsarray,$match);
            }
            return new JsonResponse($betsarray);
        }
        else{
            return new JsonResponse(null);
        }
    }

    /**
     * @Route("api/getallbets", name="getallbets" , methods={"GET"})
     * @return \Symfony\Component\HttpFoundation\JsonResponse 
     */
    public function getAllBets(){
        return new JsonResponse('a');
    }

}
