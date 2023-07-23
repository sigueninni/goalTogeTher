// SPDX-License-Identifier: GPL-3.0
pragma solidity 0.8.19;

import "../node_modules/@openzeppelin/contracts/utils/Counters.sol";
import "../node_modules/@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "../node_modules/@openzeppelin/contracts/access/Ownable.sol";

contract GoalTogeTherHandling is ReentrancyGuard, Ownable {
    using Counters for Counters.Counter;

    Counters.Counter private _idNewChallenge;
    Counters.Counter private _idNewProof;

    enum ChallengeStatus {
        OnGoing,
        Terminated
    }

    struct Challenge {
        uint256 id;
        address owner;
        uint256 amountDeposit;
        uint256 totalJoiners;
        uint256 totalPool;
        ChallengeStatus challengeStatus;
        string title;
        string commitDesc;
        string proofDesc;
        bool exists;
    }

    struct Member {
        address memberAddress;
    }

    mapping(address => uint256) memberToChallenge; //address to id of the challenge
    mapping(uint256 => address[]) ChallengeToMembers; //challenge to list of members in the challenge
    mapping(uint256 => Challenge) idToChallenge;

     Challenge[] public challenges;

    event challengeCreated(address _ownerChallenge, Challenge _challenge);
    event challengeTerminated(uint256 _idChallenge);
    event challengeDeleted(uint256 _idChallenge);
    event challengeCircleNFTMinted(
        address _memberChallenge,
        uint256 _idChallenge
    );
    event proofGiven(
        address _memberChallenge,
        uint256 _idChallenge,
        uint256 _idProof,
        uint256 timeStamp
    );

    constructor() {}

    // ::::::::::::: MODIFIERS ::::::::::::: //
    modifier ChallengeExist(uint256 _idChallenge) {
        require(idToChallenge[_idChallenge].exists, "Challenge do not exists");
        _;
    }


   // ::::::::::::: GETTERS ::::::::::::: //



 // ::::::::::::: CHALLENGE MANAGEMENT ::::::::::::: //

function createChallenge(
        string memory _title,
        uint256 _amountDeposit
      
    ) public  returns (uint256) {
     

    //    uint256 id;
    //     address owner;
    //     uint256 amountDeposit;
    //     uint256 totalJoiners;
    //     uint256 totalPool;
    //     ChallengeStatus challengeStatus;
    //     string title;
    //     string commitDesc;
    //     string proofDesc;
    //     bool exists;



        _idNewChallenge.increment(); 
        uint256 newChallengeId = _idNewChallenge.current();
        Challenge memory newChallenge;

        //Add new Challenge
        newChallenge.id = newChallengeId;
        newChallenge.owner = msg.sender;
        newChallenge.amountDeposit = _amountDeposit;
        newChallenge.title = _title;
        challenges.push(newChallenge);
    
        emit challengeCreated(msg.sender,newChallenge);
        return newChallenge.id;
    }


    
}
