// SPDX-License-Identifier: GPL-3.0
pragma solidity 0.8.19;

import "../node_modules/@openzeppelin/contracts/utils/Counters.sol";
import "../node_modules/@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "../node_modules/@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "../node_modules/@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "../node_modules/@openzeppelin/contracts/access/Ownable.sol";


/// @title  ChlChallengesMarketPlace
/// @author Saad Igueninni
/// @notice Marketplace for NFT Challenges results
/// @dev Inherits the OpenZepplin ReentrancyGuard Ownable contracts

contract ChlChallengesMarketPlace is ReentrancyGuard, Ownable {
    using Counters for Counters.Counter;

    Counters.Counter private _nftsChallengeSold;
    Counters.Counter private _nftChallengeCount;

    IERC20 public Chl;
    IERC721 public ChallengeChlNFT;

    uint256 public LISTING_CHLCHAIN_FEE = 0.0001 ether; // we keep ether as fees to have a stable fee

    mapping(uint256 => ChallengeNFT) private _idToNFT; //Keep trace of listed NFT, actual owner and seller

    struct ChallengeNFT {
        uint256 id;
        address payable seller;
        address payable owner;
        uint256 price;
        bool listed;
    }
    event ChallengeNFTListed(
        uint256 id,
        address seller,
        address owner, //current owner of contract
        uint256 price
    );
    event ChallengeNFTSold(
        uint256 id,
        address seller,
        address owner,
        uint256 price
    );

    constructor(address _ChlAddress, address _ChallengeChlNFTAddress) {
     
         Chl = IERC20(_ChlAddress);
        ChallengeChlNFT = IERC721(_ChallengeChlNFTAddress);
    }

    // ::::::::::::: MODIFIERS ::::::::::::: //

    // ::::::::::::: GETTERS ::::::::::::: //
    function getListingFee() public view returns (uint256) {
        return LISTING_CHLCHAIN_FEE;
    }

    function getListedChallengesNfts() public view returns (ChallengeNFT[] memory) {
        uint256 nftCount = _nftChallengeCount.current();
        uint256 unsoldNftsCount = nftCount - _nftsChallengeSold.current();

        ChallengeNFT[] memory ListedChallengesNfts = new ChallengeNFT[](unsoldNftsCount);
        uint256 nftsIndex = 0;
        for (uint256 i = 0; i < nftCount; i++) {
            if (_idToNFT[i + 1].listed) {
                ListedChallengesNfts[nftsIndex] = _idToNFT[i + 1];
                nftsIndex++;
            }
        }
        return ListedChallengesNfts;
    }

    function getMyChallengesNfts() public view returns (ChallengeNFT[] memory) {
        uint256 nftCount = _nftChallengeCount.current();
        uint256 myNftCount = 0;
        for (uint256 i = 0; i < nftCount; i++) {
            if (_idToNFT[i + 1].owner == msg.sender) {
                myNftCount++;
            }
        }

        ChallengeNFT[] memory MyNftsChallenge = new ChallengeNFT[](myNftCount);
        uint256 nftsIndex = 0;
        for (uint256 i = 0; i < nftCount; i++) {
            if (_idToNFT[i + 1].owner == msg.sender) {
                MyNftsChallenge[nftsIndex] = _idToNFT[i + 1];
                nftsIndex++;
            }
        }
        return MyNftsChallenge;
    }

    function getMyListedChallengesNfts() public view returns (ChallengeNFT[] memory) {
        uint256 nftCount = _nftChallengeCount.current();
        uint256 myListedNftCount = 0;
        for (uint256 i = 0; i < nftCount; i++) {
            if (
                _idToNFT[i + 1].seller == msg.sender && _idToNFT[i + 1].listed
            ) {
                myListedNftCount++;
            }
        }

        ChallengeNFT[] memory nfts = new ChallengeNFT[](myListedNftCount);
        uint256 nftsIndex = 0;
        for (uint256 i = 0; i < nftCount; i++) {
            if (
                _idToNFT[i + 1].seller == msg.sender && _idToNFT[i + 1].listed
            ) {
                nfts[nftsIndex] = _idToNFT[i + 1];
                nftsIndex++;
            }
        }
        return nfts;
    }

    // ::::::::::::: MARKETPLACE MANAGEMENT ::::::::::::: //

    // List the NFT on the marketplace
    function listChallengeNft(uint256 _tokenId, uint256 _price)
        public
        payable
        nonReentrant
    {
        require(_price > 0, "Price must be at least 1 Chl");
        require(
            msg.value >= LISTING_CHLCHAIN_FEE,
            "Not enough ether for listing fee"
        );
        //require tokenid est au statut Terminated!
       // ChallengeChlNFT.transferFrom(msg.sender, address(this), _tokenId); 
       //We choose to  mint to Marketplace from the beginning because we have 2 NFTs, 
       //one represnting the Challenge and One for results of Challenge if to be listed

        _nftChallengeCount.increment();

        _idToNFT[_tokenId] = ChallengeNFT(
            _tokenId,
            payable(msg.sender),
            payable(address(this)),
            _price,
            true
        );

        emit ChallengeNFTListed(_tokenId, msg.sender, address(this), _price);
    }

    // Buy a Challenge result
    function buyChallengeResultNft(uint256 _tokenId) //address _nftContract, 
        public
        payable
        nonReentrant
    {
        ChallengeNFT storage nft = _idToNFT[_tokenId];
        require(
            msg.value >= nft.price,
            "Not enough ether to cover asking price"
        );

        address payable buyer = payable(msg.sender);
        payable(nft.seller).transfer(msg.value);
        ChallengeChlNFT.transferFrom(address(this), buyer, nft.id);
        payable(owner()).transfer(LISTING_CHLCHAIN_FEE);
        nft.owner = buyer;
        nft.listed = false;

        _nftsChallengeSold.increment();
        emit ChallengeNFTSold(nft.id, nft.seller, buyer, msg.value);
    }

    // Resell the Challenge results
    function resellChallengeResultNft(
       // address _nftContract,
        uint256 _tokenId,
        uint256 _price
    ) public payable nonReentrant {
        require(_price > 0, "Price must be at least 1 wei");
        require(
            msg.value == LISTING_CHLCHAIN_FEE,
            "Not enough ether for listing fee"
        );

        ChallengeChlNFT.transferFrom(msg.sender, address(this), _tokenId);

        ChallengeNFT storage nft = _idToNFT[_tokenId];
        nft.seller = payable(msg.sender);
        nft.owner = payable(address(this));
        nft.listed = true;
        nft.price = _price;

        _nftsChallengeSold.decrement();
        emit ChallengeNFTListed(_tokenId, msg.sender, address(this), _price);
    }
}
