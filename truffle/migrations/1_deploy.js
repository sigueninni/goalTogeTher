const OpiChainSBT = artifacts.require("OpiChainSBT");
const Opi = artifacts.require("Opi");

module.exports = function (deployer) {
  deployer.deploy(OpiChainSBT);
  deployer.deploy(Opi);
};
