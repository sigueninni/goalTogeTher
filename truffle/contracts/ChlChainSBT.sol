// SPDX-License-Identifier: GPL-3.0
pragma solidity 0.8.19;

import "../node_modules/@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "../node_modules/@openzeppelin/contracts/utils/Counters.sol";
import "../node_modules/@openzeppelin/contracts/access/Ownable.sol";
import "../node_modules/@openzeppelin/contracts/utils/Strings.sol";
           
/// @title  ChlChain SBT contract
/// @author Saad Igueninni
/// @notice ERC721 not transferable, bound to Soul
/// @dev Inherits the OpenZepplin Ownable ,ERC721URIStorage,Counters & Strings contracts
contract ChlChainSBT is ERC721URIStorage, Ownable {
    using Counters for Counters.Counter;

    enum Gender {
        Male,
        Female
    }

    enum Role {
        Sounder,
        Challengeed
    }

    struct ChlProfile {
        uint256 ChlIdCounter;
        string name;
        Gender gender;
        uint256 age;
        Role role;
        bool isChlIdGranted;
    }

    /// @notice mapping to match Adress to Profile
    mapping(address => ChlProfile) ChlProfiles;
    Counters.Counter private _ChlIdCounter;

    event grantedChlID(ChlProfile _newChlProfile);
    event revokedChlID(address _profileAddress);
    event updatedChlID(address _profileAddress);

    constructor() ERC721("ChlChainID", "ChlId") {}

    // ::::::::::::: MODIFIERS ::::::::::::: //
    modifier onlySounders(address _profileAddress) {
        require(
            (ChlProfiles[_profileAddress].isChlIdGranted &&
                ChlProfiles[_profileAddress].role == Role.Sounder),
            "You are not a sounder"
        );
        _;
    }

    modifier onlyChallengeeds(address _profileAddress) {
        require(
            (ChlProfiles[_profileAddress].isChlIdGranted &&
                ChlProfiles[msg.sender].role == Role.Challengeed),
            "You are not a Challengeed"
        );
        _;
    }

    modifier ChlIdExists(address _profileAddress) {
        require(
            ChlProfiles[_profileAddress].isChlIdGranted,
            "ChlID do not exists"
        );
        _;
    }

    // ::::::::::::: GETTERS ::::::::::::: //
    function getChlID(address _profileAddress)
        external
        view
        onlyOwner
        ChlIdExists(_profileAddress)
        returns (ChlProfile memory)
    {
        return ChlProfiles[_profileAddress];
    }

    function isGrantedChlID(address _profileAddress)
        external
        view
        onlyOwner
        returns (bool)
    {
        return ChlProfiles[_profileAddress].isChlIdGranted;
    }

    /// @notice we check existence and role 
    function isSounder(address _profileAddress)
        external
        view
        onlyOwner
        returns (bool)
    {
        return (ChlProfiles[_profileAddress].isChlIdGranted &&
            ChlProfiles[_profileAddress].role == Role.Sounder);
    }

    /// @notice we check existence and role
    function isChallengeed(address _profileAddress)
        external
        view
        onlyOwner
        returns (bool)
    {
        return (ChlProfiles[_profileAddress].isChlIdGranted &&
            ChlProfiles[_profileAddress].role == Role.Challengeed);
    }

    // ::::::::::::: MEMBERS MANAGEMENT ::::::::::::: //

    /// @notice Owner grant SBT
    /// @dev We check non existence of profile
    /// @param _profileAddress Address of new profile
    /// @param _name Name 
    /// @param _age age
    /// @param _gender gender( )
    /// @return newChlID Id OF SBT
    function grantChlID(
        address _profileAddress,
        // string memory _SBTUri,
        string memory _name,
        uint256 _age,
        uint8 _gender,
        uint8 _role
    ) public onlyOwner returns (uint256) {
        require(
            !ChlProfiles[_profileAddress].isChlIdGranted,
            "ChlID already exists"
        );

        _ChlIdCounter.increment(); //To start at 1
        uint256 newChlID = _ChlIdCounter.current();
        ChlProfile memory newChlProfile;

        //Add new Profile
        newChlProfile.ChlIdCounter = newChlID;
        newChlProfile.name = _name;
        newChlProfile.age = _age;
        newChlProfile.gender = Gender(_gender);
        newChlProfile.role = Role(_role);
        newChlProfile.isChlIdGranted = true;
        ChlProfiles[_profileAddress] = newChlProfile;

        _mint(_profileAddress, newChlID);

        string memory urinumber = Strings.toString(newChlID);
        string
            memory tokenURI = "https://ipfs.io/ipfs/QmQiceiGFxV72zuKhy3ggZhoFu1Gcuvu35khedjtxAML6G/";
        string memory _SBTUri = string.concat(tokenURI, urinumber, ".json");

        _setTokenURI(newChlID, _SBTUri);

        emit grantedChlID(newChlProfile);
        return newChlID;
    }


    /// @notice Owner revoke SBT
    /// @dev Wecheck exitence before revoking
    /// @param _profileAddress Address of the revoked profile
    function revokeChlID(address _profileAddress) external onlyOwner {
        require(
           ChlProfiles[_profileAddress].isChlIdGranted,
            "ChlID do not exists"
        );
        emit revokedChlID(_profileAddress);
        delete ChlProfiles[_profileAddress];
    }


    /// @notice Owner update SBT
    /// @dev We check  existence of profile
    /// @param _profileAddress Address of  profile to be updated
    /// @param _name Name 
    /// @param _age age
    /// @param _gender gender( )
    function updateChlID(
        address _profileAddress,
        string calldata _name,
        uint256 _age,
        uint8 _gender,
        uint8 _role
    ) external onlyOwner {
        require(
           ChlProfiles[_profileAddress].isChlIdGranted,
            "ChlID do not exists"
        );

        ChlProfile memory UpdChlProfile;

        UpdChlProfile = ChlProfiles[_profileAddress];
        UpdChlProfile.name = _name;
        UpdChlProfile.age = _age;
        UpdChlProfile.gender = Gender(_gender);
        UpdChlProfile.role = Role(_role);
        ChlProfiles[_profileAddress] = UpdChlProfile;

        emit updatedChlID(_profileAddress);
    }

    // ::::::::::::: OVVERIDES ::::::::::::: //
    /// @notice Usage of hook to block Transfer of SBT
    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 tokenId,
        uint256 batchSize
    ) internal virtual override {
        require(
            from == address(0),
            "SBT : not possible to Transfer your ChlId"
        );
        super._beforeTokenTransfer(from, to, tokenId, batchSize);
    }
}
