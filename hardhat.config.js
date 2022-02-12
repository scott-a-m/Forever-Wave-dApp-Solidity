require('@nomiclabs/hardhat-waffle');
require("dotenv").config();

module.exports = {
  solidity: '0.8.0',
  networks: {
    rinkeby: {
      url: process.env.ALCHEMY_RINKEBY_KEY,
      accounts: [process.env.WALLET_KEY],
    },
    ropsten: {
      url: process.env.ALCHEMY_ROPSTEN_KEY,
      accounts: [process.env.WALLET_KEY],
    },
  },
};
