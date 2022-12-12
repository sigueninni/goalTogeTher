const OpiChainSBT = artifacts.require("./OpiChainSBT.sol");
const { BN, expectRevert, expectEvent } = require('@openzeppelin/test-helpers');
const { expect } = require('chai');


contract("OpiChainSBT", accounts => {

  
  const _owner = accounts[0];
  const _notOwner = accounts[5];
  const _profiles = [accounts[1], accounts[2], accounts[3]];
  let OpiChainSBTInstance;

  /******************************************/ 
  /***we test the grant OPI id function ***/
  /*****************************************/ 
  describe("Granting Opi ID", function () {
    
    beforeEach(async function () {
      OpiChainSBTInstance = await OpiChainSBT.new({from:_owner});
    });

    it("Opi ID not granted before Minting  -> OK", async () => {
      const opiIDexist = await OpiChainSBTInstance.isGrantedOpiID(_profiles[0]);
      expect(opiIDexist).to.equal(false);
    });


    it("Opi ID  granted only by owner  -> OK", async () => {
      await OpiChainSBTInstance.grantOpiID(_profiles[0], "Cyril", "29", 0, 0) ;
      const opiIDexist = await OpiChainSBTInstance.isGrantedOpiID(_profiles[0]);
      expect(opiIDexist).to.equal(true);
    });


    it('reverts when notOwner grant Opi ID  -> OK', async function () {
      await expectRevert(
        OpiChainSBTInstance.grantOpiID(_profiles[0], "Cyril", "29", 0, 0 , { from: _notOwner }),
        'Ownable: caller is not the owner',
      );
    });


    it("Opi ID  granted after Minting  -> OK", async () => {
      await OpiChainSBTInstance.grantOpiID(_profiles[0], "Cyril", 29, 0, 0, { from: _owner }) ;
      const opiIDexist = await OpiChainSBTInstance.isGrantedOpiID(_profiles[0]);
      expect(opiIDexist).to.equal(true);
    });


    it("reverts when same Adress added more than 1 time  -> OK", async () => {
      await  OpiChainSBTInstance.grantOpiID(_profiles[0], "Cyril", "29", 0, 0 , { from: _owner });
      await expectRevert(
        OpiChainSBTInstance.grantOpiID(_profiles[0], "Cyril", "29", 0, 0 , { from: _owner }),
        'OpiID already exists',
      );
    });


    it("Opi ID  data are correct  -> OK", async () => {
      await OpiChainSBTInstance.grantOpiID(_profiles[0], "Cyril", 29, 0, 0) ;
      const profile = await OpiChainSBTInstance.getOpiID(_profiles[0]);
      expect(profile.name).to.equal("Cyril");
      expect(profile.age).to.be.bignumber.equal(BN(29));
      expect(profile.role).to.be.bignumber.equal(BN(0));
      expect(profile.gender).to.be.bignumber.equal(BN(0));
    });


     it("Ownership of OpiID token  -> OK", async () => {
      const newOpiId = await OpiChainSBTInstance.grantOpiID(_profiles[0], "Cyril", 29, 0, 0) ;
      const owner = await OpiChainSBTInstance.ownerOf(BN(1) );
       expect(owner).to.equal(_profiles[0]);
    }); 
    
    it("emit a grantedOpiID event  -> OK", async () => {
      expectEvent(
        await OpiChainSBTInstance.grantOpiID(_profiles[0], "Cyril", 29, 0, 0) ,  "grantedOpiID");
    });

    after(async function () {
      VotingInstance = null;
    });
  });


   /******************************************/ 
  /***we test the update OPI id function ***/
  /*****************************************/ 
  describe("Update Opi ID", function () {
    beforeEach(async function () {
      OpiChainSBTInstance = await OpiChainSBT.new({from:_owner});
    });

    it("Updating Opi Profile  -> OK", async () => {
       await OpiChainSBTInstance.grantOpiID(_profiles[0], "Cyril", 29, 0, 0, { from: _owner }) ;
       const profile = await OpiChainSBTInstance.getOpiID(_profiles[0]);
       expect(profile.age).to.be.bignumber.equal(BN(29));
       await OpiChainSBTInstance.updateOpiID(_profiles[0], "Cyril", 30, 0, 0, { from: _owner }) ;
       const profileUpdated = await OpiChainSBTInstance.getOpiID(_profiles[0]);
       expect(profileUpdated.age).to.be.bignumber.equal(BN(30)); 
       
    });

    it("emit a updatedOpiID event -> OK", async () => {
      await OpiChainSBTInstance.grantOpiID(_profiles[0], "Cyril", 29, 0, 0, { from: _owner }) ;
      expectEvent(
        await OpiChainSBTInstance.updateOpiID(_profiles[0], "Cyril", 30, 0, 0) ,  "updatedOpiID");
    });


    after(async function () {
      VotingInstance = null;
    });
  });


  /******************************************/ 
  /***we test the revoke OPI id function ***/
  /*****************************************/ 
  describe("revoke Opi ID", function () {

    beforeEach(async function () {
      OpiChainSBTInstance = await OpiChainSBT.new({from:_owner});
    });

    it("Revoking Opi Profile -> OK", async () => {
      await OpiChainSBTInstance.grantOpiID(_profiles[0], "Cyril", 29, 0, 0, { from: _owner }) ;
     // const profile = await OpiChainSBTInstance.getOpiID(_profiles[0]);
      let opiIDexist = await OpiChainSBTInstance.isGrantedOpiID(_profiles[0]);
      expect(opiIDexist).to.equal(true);
      await OpiChainSBTInstance.revokeOpiID(_profiles[0], { from: _owner }) ;
       opiIDexist = await OpiChainSBTInstance.isGrantedOpiID(_profiles[0]);
      expect(opiIDexist).to.equal(false); 
      
   });

   it("emit a revokedOpiID event  -> OK", async () => {
     await OpiChainSBTInstance.grantOpiID(_profiles[0], "Cyril", 29, 0, 0, { from: _owner }) ;
     expectEvent(
       await OpiChainSBTInstance.revokeOpiID(_profiles[0]) ,  "revokedOpiID");
   });
  

    after(async function () {
      VotingInstance = null;
    });
  });


  /******************************************/ 
  /***we test the transfer OPI id function ***/
  /*****************************************/ 
  describe("Transfer OPI id", function () {

    beforeEach(async function () {
      OpiChainSBTInstance = await OpiChainSBT.new({from:_owner});
    });

    it("Opi ID is bound to Soul, not Transferable -> OK", async () => {
      await OpiChainSBTInstance.grantOpiID(_profiles[0], "Cyril", 29, 0, 0, { from: _owner }) ;

      await expectRevert(
         OpiChainSBTInstance.transferFrom(_profiles[0], _profiles[1], 1, { from: _profiles[0] }),
        "SBT : not possible to Transfer your OpiId",
      );


    });


    after(async function () {
      VotingInstance = null;
    });
  });

});


