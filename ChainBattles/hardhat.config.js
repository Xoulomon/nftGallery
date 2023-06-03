require('dotenv').config();
require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.18",
  networks: {
    // mumbai:{
    //   url: "https://polygon-mumbai.g.alchemy.com/v2/xGpPAPS7qRkUVJrvcK7pfv4oiargCgJm" ,
    //   accounts: ["0xb5369d5f226ad1c2158f304cc9bcdfc35db3bab03cc6a8a08fd0d67d86965ba5"]
    // },
    mumbai:{
      url: process.env.TESTNET_RPC ,
      accounts: [process.env.PRIVATE_KEY]
    }
  },
  etherscan: {
    apiKey: {
      polygonMumbai: process.env.POLYGONSCAN_API_KEY
    }
  }
};
