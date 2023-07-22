const ChlDex = artifacts.require("./ChlDex.sol");
const Chl= artifacts.require("./Chl.sol");
const { BN, expectRevert, expectEvent } = require('@openzeppelin/test-helpers');
const { expect } = require('chai');


contract("ChlDex", accounts => {

    const _owner = accounts[0];
    const _buyer = accounts[1];
    let ChlDexinstance , Chlinstance;


   /******************************************/ 
  /***we test the buy Token               ***/
  /*****************************************/ 
  describe("Buy Token CHL", function () {

    beforeEach(async function () {
       Chlinstance = await Chl.new({from:_owner});
        ChlDexinstance = await ChlDex.new(Chlinstance.address,{from:_owner});
    });

    it("Eth needed to buy CHL -> OK", async () => {
      await expectRevert(
        ChlDexinstance.buyTokens( { from: _buyer }),
        "ETH needed to buy CHLs",
      );
    });


    it("Not enough CHLs in balance of ChlDex -> OK", async () => {
        await expectRevert(
          ChlDexinstance.buyTokens( { from: _buyer ,  value: web3.utils.toWei("1000000000000000000000000000000000000000000000000000000000", 'ether') }),
          "Not enough CHLs in balance of ChlDex",
        );
      });

    after(async function () {
        ChlDexinstance = null;
    });
  });






});