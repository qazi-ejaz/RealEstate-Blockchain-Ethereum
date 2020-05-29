// migrating the appropriate contracts
var SquareVerifier = artifacts.require("./SquareVerifier");
var SolnSquareVerifier = artifacts.require("./SoInSquareVerifier");
var myToken = artifacts.require("./myToken");

module.exports = function (deployer) {
  //deployer.deploy(myToken);
  deployer.deploy(SquareVerifier)
    .then(() => {
      return deployer.deploy(SolnSquareVerifier, SquareVerifier.address, "Shakalaka Boom Boom", "QEUR");
    })
};