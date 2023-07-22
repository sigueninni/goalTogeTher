const ChlChainSBT = artifacts.require("./ChlChainSBT.sol");
const { BN, expectRevert, expectEvent } = require('@openzeppelin/test-helpers');
const { expect } = require('chai');


contract("ChlChainSBT", accounts => {

  
  const _owner = accounts[0];
  const _notOwner = accounts[5];
  const _profiles = [accounts[1], accounts[2], accounts[3]];
  let ChlChainSBTInstance;

  /******************************************/ 
  /***we test the grant CHL id function ***/
  /*****************************************/ 
  describe("Granting Chl ID", function () {
    
    beforeEach(async function () {
      ChlChainSBTInstance = await ChlChainSBT.new({from:_owner});
    });

    it("Chl ID not granted before Minting  -> OK", async () => {
      const ChlIDexist = await ChlChainSBTInstance.isGrantedChlID(_profiles[0]);
      expect(ChlIDexist).to.equal(false);
    });


    it("Chl ID  granted only by owner  -> OK", async () => {
      await ChlChainSBTInstance.grantChlID(_profiles[0], "Cyril", "29", 0, 0) ;
      const ChlIDexist = await ChlChainSBTInstance.isGrantedChlID(_profiles[0]);
      expect(ChlIDexist).to.equal(true);
    });


    it('reverts when notOwner grant Chl ID  -> OK', async function () {
      await expectRevert(
        ChlChainSBTInstance.grantChlID(_profiles[0], "Cyril", "29", 0, 0 , { from: _notOwner }),
        'Ownable: caller is not the owner',
      );
    });


    it("Chl ID  granted after Minting  -> OK", async () => {
      await ChlChainSBTInstance.grantChlID(_profiles[0], "Cyril", 29, 0, 0, { from: _owner }) ;
      const ChlIDexist = await ChlChainSBTInstance.isGrantedChlID(_profiles[0]);
      expect(ChlIDexist).to.equal(true);
    });


    it("reverts when same Adress added more than 1 time  -> OK", async () => {
      await  ChlChainSBTInstance.grantChlID(_profiles[0], "Cyril", "29", 0, 0 , { from: _owner });
      await expectRevert(
        ChlChainSBTInstance.grantChlID(_profiles[0], "Cyril", "29", 0, 0 , { from: _owner }),
        'ChlID already exists',
      );
    });


    it("Chl ID  data are correct  -> OK", async () => {
      await ChlChainSBTInstance.grantChlID(_profiles[0], "Cyril", 29, 0, 0) ;
      const profile = await ChlChainSBTInstance.getChlID(_profiles[0]);
      expect(profile.name).to.equal("Cyril");
      expect(profile.age).to.be.bignumber.equal(BN(29));
      expect(profile.role).to.be.bignumber.equal(BN(0));
      expect(profile.gender).to.be.bignumber.equal(BN(0));
    });


     it("Ownership of ChlID token  -> OK", async () => {
      const newChlId = await ChlChainSBTInstance.grantChlID(_profiles[0], "Cyril", 29, 0, 0) ;
      const owner = await ChlChainSBTInstance.ownerOf(BN(1) );
       expect(owner).to.equal(_profiles[0]);
    }); 
    
    it("emit a grantedChlID event  -> OK", async () => {
      expectEvent(
        await ChlChainSBTInstance.grantChlID(_profiles[0], "Cyril", 29, 0, 0) ,  "grantedChlID");
    });

    after(async function () {
      VotingInstance = null;
    });
  });


   /******************************************/ 
  /***we test the update CHL id function ***/
  /*****************************************/ 
  describe("Update Chl ID", function () {
    beforeEach(async function () {
      ChlChainSBTInstance = await ChlChainSBT.new({from:_owner});
    });

    it("Updating Chl Profile  -> OK", async () => {
       await ChlChainSBTInstance.grantChlID(_profiles[0], "Cyril", 29, 0, 0, { from: _owner }) ;
       const profile = await ChlChainSBTInstance.getChlID(_profiles[0]);
       expect(profile.age).to.be.bignumber.equal(BN(29));
       await ChlChainSBTInstance.updateChlID(_profiles[0], "Cyril", 30, 0, 0, { from: _owner }) ;
       const profileUpdated = await ChlChainSBTInstance.getChlID(_profiles[0]);
       expect(profileUpdated.age).to.be.bignumber.equal(BN(30)); 
       
    });

    it("emit a updatedChlID event -> OK", async () => {
      await ChlChainSBTInstance.grantChlID(_profiles[0], "Cyril", 29, 0, 0, { from: _owner }) ;
      expectEvent(
        await ChlChainSBTInstance.updateChlID(_profiles[0], "Cyril", 30, 0, 0) ,  "updatedChlID");
    });


    after(async function () {
      VotingInstance = null;
    });
  });


  /******************************************/ 
  /***we test the revoke CHL id function ***/
  /*****************************************/ 
  describe("revoke Chl ID", function () {

    beforeEach(async function () {
      ChlChainSBTInstance = await ChlChainSBT.new({from:_owner});
    });

    it("Revoking Chl Profile -> OK", async () => {
      await ChlChainSBTInstance.grantChlID(_profiles[0], "Cyril", 29, 0, 0, { from: _owner }) ;
     // const profile = await ChlChainSBTInstance.getChlID(_profiles[0]);
      let ChlIDexist = await ChlChainSBTInstance.isGrantedChlID(_profiles[0]);
      expect(ChlIDexist).to.equal(true);
      await ChlChainSBTInstance.revokeChlID(_profiles[0], { from: _owner }) ;
       ChlIDexist = await ChlChainSBTInstance.isGrantedChlID(_profiles[0]);
      expect(ChlIDexist).to.equal(false); 
      
   });

   it("emit a revokedChlID event  -> OK", async () => {
     await ChlChainSBTInstance.grantChlID(_profiles[0], "Cyril", 29, 0, 0, { from: _owner }) ;
     expectEvent(
       await ChlChainSBTInstance.revokeChlID(_profiles[0]) ,  "revokedChlID");
   });
  

    after(async function () {
      VotingInstance = null;
    });
  });


  /******************************************/ 
  /***we test the transfer CHL id function ***/
  /*****************************************/ 
  describe("Transfer CHL id", function () {

    beforeEach(async function () {
      ChlChainSBTInstance = await ChlChainSBT.new({from:_owner});
    });

    it("Chl ID is bound to Soul, not Transferable -> OK", async () => {
      await ChlChainSBTInstance.grantChlID(_profiles[0], "Cyril", 29, 0, 0, { from: _owner }) ;

      await expectRevert(
         ChlChainSBTInstance.transferFrom(_profiles[0], _profiles[1], 1, { from: _profiles[0] }),
        "SBT : not possible to Transfer your ChlId",
      );


    });


    after(async function () {
      VotingInstance = null;
    });
  });

});


