const OpiChainSBT = artifacts.require("OpiChainSBT");

module.exports = function (deployer) {
  deployer.deploy(OpiChainSBT);
};
