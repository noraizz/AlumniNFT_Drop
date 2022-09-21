require("@nomicfoundation/hardhat-toolbox");
require('dotenv').config()
require("@nomiclabs/hardhat-etherscan")
//require("@nomicfoundation/hardhat-waffle")
require("@nomiclabs/hardhat-ethers");
/** @type import('hardhat/config').HardhatUserConfig */

//contract address:0x6d9E65002Cf4f80FcD068fbB15aEb6e2f8D40188
//newcontract address=0x0088A506333862d6ba23eA3169710b773b9af710

module.exports = {
  solidity: "0.8.9",
  networks:{
    rinkeby:{
      url:"https://eth-rinkeby.alchemyapi.io/v2/BhVl0pC3URgP3s6MbzSL5DK5LMCGr24a",
      accounts:["3c71d1d015f91cb1ce214b23309602e676b8b17aeb016c2f0c0ed40cf646ffac"]
    }
  },
   etherscan:{
     // apiKey:"U4YENIKR81CF7A648G5VP9NX8I4DP4XF7Y"
    apiKey:"5TWHCX24SBYR1NFH72V7YAGXZDSYXYGY7T"
   }
};
