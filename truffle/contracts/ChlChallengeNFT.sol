// SPDX-License-Identifier: GPL-3.0
pragma solidity 0.8.19;

import "../node_modules/@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "../node_modules/@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "../node_modules/@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "../node_modules/@openzeppelin/contracts/utils/Counters.sol";
import "../node_modules/@openzeppelin/contracts/access/Ownable.sol";
import "../node_modules/@openzeppelin/contracts/utils/Strings.sol";

//Interface ChlChainSBT
/*interface ChlChainSBT {
    function isSounder(address _profileAddress) external view returns (bool);
    function isChallengeed(address _profileAddress) external view returns (bool);
}*/

/// @title  ChlChain Challenge NFT
/// @author Saad Igueninni
/// @notice ERC721 NFT associated to on Challenge
/// @dev Inherits the OpenZepplin Ownable ,ERC721URIStorage,Counters & Strings contracts
contract ChlChainChallengeNFT is ERC721URIStorage, Ownable {
    using Counters for Counters.Counter;

    Counters.Counter private _idQuestion;
    Counters.Counter private _idAnswer;
    Counters.Counter private _idChallengeNFT;

    enum ChallengeStatus {
        OnGoing,
        Terminated
    }

    struct Question {
        uint256 idQuestion;
        string textQuestion;
    }

    struct Answer {
        address ownerAnswer;
        uint256 idAnswer;
        string textAnswer;
    }

    struct Challenge {
        uint256 idChallenge;
        address owner;
        string description;
        ChallengeStatus ChallengeStatus;
        bool exists;
        bool minted;
        bool listed;
    }

    mapping(uint256 => Challenge) idToChallenges;
    //mapping(uint256 => address) idToOwner;
    mapping(address => Challenge[]) addressToChallenges;
    // mapping( uint => Answer[])  questionToAnswers;
    mapping(uint256 => Question[]) ChallengeToQuestion;
    mapping(uint256 => mapping(uint256 => Answer[])) ChallengeToQuestionToAnswer;

    uint256 public constant ChallengeUnitCost = 500;
    //address marketplaceContract;
    // ChlChainSBT sbtContract;
    IERC20 Chl;

    event ChallengeCreated(address _ownerChallenge, uint256 _idChallenge);
    event ChallengeTerminated(uint256 _idChallenge);
    event ChallengeDeleted(uint256 _idChallenge);
    event ChallengeNFTMinted(uint256 _idChallenge);
    event questionAdded(uint256 _idQuestion, uint256 _idChallenge);
    event answerGiven(
        address _ownerAnswer,
        uint256 _idAnswer,
        uint256 _idChallenge,
        uint256 idQuestion
    );

    //constructor(address _marketplaceContract, address _ChlChainSBTAddress,address _ChlAddress)
    constructor() ERC721("ChlChainChallenge", "OPS") {
        //marketplaceContract = _marketplaceContract;
        // sbtContract = ChlChainSBT(_ChlChainSBTAddress);
        // Chl = IERC20(_ChlAddress);
    }

    // ::::::::::::: MODIFIERS ::::::::::::: //
    modifier ChallengeExist(uint256 _idChallenge) {
        require(idToChallenges[_idChallenge].exists, "Challenge do not exists");
        _;
    }

    /* modifier onlySounders() {
        require(sbtContract.isSounder(msg.sender), "You are not a sounder");
        _;
    }

    modifier onlyChallengeeds() {
        require(sbtContract.isChallengeed(msg.sender), "You are not a Challengeed");
        _;
    }*/

    // ::::::::::::: GETTERS ::::::::::::: //
    function getChallengeStatusById(uint256 _idChallenge)
        public
        view
        returns (uint256)
    {
        return (uint256(idToChallenges[_idChallenge].ChallengeStatus));
    }

    function getChallengeById(uint256 _idChallenge)
        public
        view
        returns (Challenge memory)
    {
        return idToChallenges[_idChallenge];
    }

    function getChallengeByAddress(address _ownerChallenge, uint256 _idChallenge)
        public
        view
        returns (Challenge memory)
    {
        return addressToChallenges[_ownerChallenge][_idChallenge];
    }

    function getMyChallenges()
        public
        view
        returns ( Challenge[] memory)
    {
        return addressToChallenges[msg.sender];
    }

    // ::::::::::::: SETTERS ::::::::::::: //
    /// @notice Terminate Challenge
    /// @dev We check non existence of Challenge
    /// @param _idChallenge Id of ChallengeNFT result
    function setChallengeTerminated(uint256 _idChallenge)
        internal
        ChallengeExist(_idChallenge)
    {
        idToChallenges[_idChallenge].ChallengeStatus = ChallengeStatus.Terminated;
       // addressToChallenges[msg.sender][_idChallenge].ChallengeStatus = ChallengeStatus.Terminated;
        //Check if we need the mapping
        emit ChallengeTerminated(_idChallenge);
    }

    /// @notice change Flag listed
    /// @param _idChallenge Id of ChallengeNFT result
    function setChallengeListed(uint256 _idChallenge) external {
        idToChallenges[_idChallenge].listed = true;
    //    addressToChallenges[msg.sender][_idChallenge].listed = true;
    }

    function setChallengeOwner(uint256 _idChallenge, address _owner) external {
        idToChallenges[_idChallenge].owner = _owner;
     //   addressToChallenges[msg.sender][_idChallenge].owner = _owner;
    }

    // ::::::::::::: ChallengeS HANDLING ::::::::::::: //

    /// @notice Create a Challenge
    /// @dev We check non existence of Challenge and check Balance of Chls to be able to create Challenges
    /// @param _ownerChallenge owner of ChallengeNFT result
    /// @param _description description
    function createChallenge(address _ownerChallenge, string memory _description)
        external
    {
        //require assez de balance
        uint256 newIdChallenge = _idChallengeNFT.current();
        Challenge memory NewChallenge;
        NewChallenge = Challenge(
            newIdChallenge,
            _ownerChallenge,
            _description,
            ChallengeStatus.OnGoing,
            true,
            false,
            false
        );

        //Update mapping
        idToChallenges[newIdChallenge] = NewChallenge;
        addressToChallenges[_ownerChallenge].push(NewChallenge);
        _idChallengeNFT.increment();
        emit ChallengeCreated(_ownerChallenge, newIdChallenge);
    }

    /// @notice Mint a Challenge
    /// @dev Mint only when in status Terminated
    /// @param _idChallenge id of ChallengeNFT result
    function mintChallenge(address marketplaceContract, uint256 _idChallenge)
        external
    {
        require(
            getChallengeStatusById(_idChallenge) == uint256(ChallengeStatus.Terminated),
            "Challenge not terminated"
        );

        address _ownerChallenge;

        //setApprovalForAll(marketplaceContract, true); //Give approval to marketplace
        _ownerChallenge = idToChallenges[_idChallenge].owner;
        _mint(marketplaceContract, _idChallenge);
        setApprovalForAll(marketplaceContract, true);
        idToChallenges[_idChallenge].minted = true;
        
        //addressToChallenges[_ownerChallenge][_idChallenge].minted = true;

        string memory urinumber = Strings.toString(_idChallenge);
        string
            memory tokenURI = "https://ipfs.io/ipfs/QmUqDEuxQ4gmp99ZqEfQRdnrh4YsnEAjhiDreUxwYCGuxo/"; //To change by CID of !!
        string memory _Uri = string.concat(tokenURI, urinumber, ".json");

        _setTokenURI(_idChallenge, _Uri);

        emit ChallengeNFTMinted(_idChallenge);
    }

    /// @notice Terminate a Challenge
    /// @dev only Terminated Challenges can be minted
    /// @param _idChallenge id of ChallengeNFT result
    function terminateChallenge(
        uint256 _idChallenge //onlyChallengeeds
    ) external {
        require(
            getChallengeStatusById(_idChallenge) == uint256(ChallengeStatus.OnGoing),
            "Challenge not onGoing!"
        );
        setChallengeTerminated(_idChallenge);
        emit ChallengeTerminated(_idChallenge);
    }

    function deleteChallenge(uint256 _idChallenge) external {
        delete idToChallenges[_idChallenge];
        emit ChallengeDeleted(_idChallenge);
    }

    // ::::::::::::: QUESTIONS MANAGEMENT ::::::::::::: //

    /// @notice Add a question
    /// @dev Only Challengeeds can add a question
    /// @param _idChallenge id of ChallengeNFT result
    /// @param _question txt of question
    function addQuestion(uint256 _idChallenge, string memory _question)
        external
    //onlyChallengeeds
    {
        uint256 newIdQuestion = _idQuestion.current();
        ChallengeToQuestion[_idChallenge].push(Question(newIdQuestion, _question));
        _idQuestion.increment();
        emit questionAdded(newIdQuestion, _idChallenge);
    }

    // ::::::::::::: ANSWERS MANAGEMENT ::::::::::::: //

    /// @notice Give answer
    /// @dev Only Sounders can answer
    /// @param _idChallenge id of ChallengeNFT result
    /// @param _answer txt of answer
    function giveAnswer(
        uint256 _idChallenge,
        uint256 _idQuestionAnswer,
        string memory _answer //onlySounders
    ) external {
        uint256 newIdAnswer = _idAnswer.current();
        ChallengeToQuestionToAnswer[_idChallenge][_idQuestionAnswer].push(
            Answer(msg.sender, newIdAnswer, _answer)
        );
        _idAnswer.increment();
        emit answerGiven(msg.sender, newIdAnswer, _idChallenge, _idQuestionAnswer);
    }

    //reveal_results -> une fois TERMINATED , & vendu on peut reveal.

    // ::::::::::::: OVVERIDES ::::::::::::: //
}
