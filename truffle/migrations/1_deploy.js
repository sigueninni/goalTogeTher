const OpiChainSBT = artifacts.require("OpiChainSBT");
const Opi = artifacts.require("Opi");
const OpiDex = artifacts.require("OpiDex");

module.exports = function (deployer) {
  deployer.deploy(OpiChainSBT);

  deployer.then(async () => {

    console.log('\n\n 📡 Deploying...\n');
    const opi = await deployer.deploy(Opi);
    const opiDex = await deployer.deploy(OpiDex, opi.address);

    console.log('\n 🏵  Sending  100000000 OPIS to the opiDex...\n');
    const resultTransfer = await opi.transfer(opiDex.address, "100000000");

    console.log('\n 🏵 Balance of OpiDex --> \n', (await opi.balanceOf(opiDex.address)).toString());

  });

};
