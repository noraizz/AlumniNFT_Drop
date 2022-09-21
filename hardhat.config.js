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
      accounts:[""]
    }
  },
   etherscan:{
     // apiKey:""
    apiKey:""
   }
};
