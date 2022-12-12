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

    it("Opi ID not granted before Minting", async () => {
      const opiIDexist = await OpiChainSBTInstance.isGrantedOpiID(_profiles[0]);
      expect(opiIDexist).to.equal(false);
    });


    it("Opi ID  granted only by owner ", async () => {
      await OpiChainSBTInstance.grantOpiID(_profiles[0], "Cyril", "29", 0, 0) ;
      const opiIDexist = await OpiChainSBTInstance.isGrantedOpiID(_profiles[0]);
      expect(opiIDexist).to.equal(true);
    });


    it('reverts when notOwner grant Opi ID', async function () {
      await expectRevert(
        OpiChainSBTInstance.grantOpiID(_profiles[0], "Cyril", "29", 0, 0 , { from: _notOwner }),
        'Ownable: caller is not the owner',
      );
    });


    it("Opi ID  granted after Minting ", async () => {
      await OpiChainSBTInstance.grantOpiID(_profiles[0], "Cyril", 29, 0, 0) ;
      const opiIDexist = await OpiChainSBTInstance.isGrantedOpiID(_profiles[0]);
      expect(opiIDexist).to.equal(true);
    });


    it("Opi ID  data are OK", async () => {
      await OpiChainSBTInstance.grantOpiID(_profiles[0], "Cyril", 29, 0, 0) ;
      const profile = await OpiChainSBTInstance.getOpiID(_profiles[0]);
      expect(profile.name).to.equal("Cyril");
      expect(profile.age).to.be.bignumber.equal(BN(29));
      expect(profile.role).to.be.bignumber.equal(BN(0));
      expect(profile.gender).to.be.bignumber.equal(BN(0));
    });


     it("Ownership of OpiID token is OK ", async () => {
      const newOpiId = await OpiChainSBTInstance.grantOpiID(_profiles[0], "Cyril", 29, 0, 0) ;
      const owner = await OpiChainSBTInstance.ownerOf(BN(parseInt(newOpiId) ));
      expect(owner).to.equal(_profiles[0]);
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

    it("Opi ID not granted before Minting", async () => {
      const opiIDexist = await OpiChainSBTInstance.isGrantedOpiID(_profiles[0]);
      expect(opiIDexist).to.equal(false);
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

    it("Opi ID not granted before Minting", async () => {
      const opiIDexist = await OpiChainSBTInstance.isGrantedOpiID(_profiles[0]);
      expect(opiIDexist).to.equal(false);
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

    it("Opi ID not granted before Minting", async () => {
      const opiIDexist = await OpiChainSBTInstance.isGrantedOpiID(_profiles[0]);
      expect(opiIDexist).to.equal(false);
    });


    after(async function () {
      VotingInstance = null;
    });
  });


});


