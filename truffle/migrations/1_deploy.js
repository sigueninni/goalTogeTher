const OpiChainSBT = artifacts.require("OpiChainSBT");
const Opi = artifacts.require("Opi");
const OpiDex = artifacts.require("OpiDex");
const OpiChainSurveyNFT  = artifacts.require("OpiChainSurveyNFT");

module.exports = function (deployer) {
  console.log('\n\n 📡 Deploying unit contracts...\n');
  
  deployer.deploy(OpiChainSBT);
  deployer.deploy(OpiChainSurveyNFT);

  console.log('\n\n 📡 Deploying dependant contracts...\n');
  deployer.then(async () => {
    const opi = await deployer.deploy(Opi);
    const opiDex = await deployer.deploy(OpiDex, opi.address);

    console.log('\n 🏵  Sending  100000000 OPIS to the opiDex...\n');
    const resultTransfer = await opi.transfer(opiDex.address, "100000000");

    console.log('\n 🏵 Balance of OpiDex --> \n', (await opi.balanceOf(opiDex.address)).toString());

  });

};
