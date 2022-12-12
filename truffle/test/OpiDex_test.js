const OpiDex = artifacts.require("./OpiDex.sol");
const Opi= artifacts.require("./Opi.sol");
const { BN, expectRevert, expectEvent } = require('@openzeppelin/test-helpers');
const { expect } = require('chai');


contract("OpiDex", accounts => {

    const _owner = accounts[0];
    const _buyer = accounts[1];
    let OpiDexinstance , Opiinstance;


   /******************************************/ 
  /***we test the buy Token               ***/
  /*****************************************/ 
  describe("Buy Token OPI", function () {

    beforeEach(async function () {
       Opiinstance = await Opi.new({from:_owner});
        OpiDexinstance = await OpiDex.new(Opiinstance.address,{from:_owner});
    });

    it("Eth needed to buy OPI -> OK", async () => {
      await expectRevert(
        OpiDexinstance.buyTokens( { from: _buyer }),
        "ETH needed to buy OPIs",
      );
    });


    it("Not enough OPIs in balance of OpiDex -> OK", async () => {
        await expectRevert(
          OpiDexinstance.buyTokens( { from: _buyer ,  value: web3.utils.toWei("1000000000000000000000000000000000000000000000000000000000", 'ether') }),
          "Not enough OPIs in balance of OpiDex",
        );
      });

    after(async function () {
        OpiDexinstance = null;
    });
  });






});