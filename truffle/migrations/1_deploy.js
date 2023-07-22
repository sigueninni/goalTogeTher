const ChlChainSBT = artifacts.require("ChlChainSBT");
const Chl = artifacts.require("Chl");
const ChlDex = artifacts.require("ChlDex");
const ChlChainChallengeNFT  = artifacts.require("ChlChainChallengeNFT");
const  ChlChallengesMarketPlace = artifacts.require("ChlChallengesMarketPlace");

module.exports = function (deployer) {
  console.log('\n\n 📡 Deploying unit contracts...\n');
  
  deployer.deploy(ChlChainSBT);

  console.log('\n\n 📡 Deploying dependant contracts...\n');
  
  deployer.then(async () => {
    const Chl = await deployer.deploy(Chl);
    const  ChlChainChallengeNFT = await deployer.deploy(ChlChainChallengeNFT);
    const ChlDex = await deployer.deploy(ChlDex, Chl.address);
    const ChlChallengesMarketPlace = await deployer.deploy(ChlChallengesMarketPlace, Chl.address,ChlChainChallengeNFT.address);

    console.log('\n 🏵  Sending  100000000 CHLS to the ChlDex...\n');
    const resultTransfer = await Chl.transfer(ChlDex.address, "100000000");

    console.log('\n 🏵 Balance of ChlDex --> \n', (await Chl.balanceOf(ChlDex.address)).toString());

  });

};
