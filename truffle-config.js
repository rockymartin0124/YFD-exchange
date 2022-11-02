require('dotenv').config();
const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');

const ropstenUrl = `https://ropsten.infura.io/v3/${process.env.INFURAKEY}`;
const mainNetUrl = `https://mainnet.infura.io/v3/${process.env.INFURAKEY}`;
const rinkebyUrl=`https://rinkeby.infura.io/v3/${process.env.INFURAKEY}`;
const EtherScankey = process.env.ETHESCANKEY;
module.exports = {
  plugins: [
    'truffle-plugin-verify'
  ],
  api_keys: {
    etherscan: EtherScankey
  },
  networks: {
    development: {
      host: '127.0.0.1',
      port: 8545,
      network_id: '*',
      gas: 6721975,
      gasPrice: 2000000000,
    },
    ropsten: {
      provider() {
        return new HDWalletProvider(process.env.PRIVATEKEY, ropstenUrl, 0);
      },
      network_id: 3,
      gasPrice: Web3.utils.toWei('25', 'gwei'),
      gas: 8000000,
    },
    rinkeby: {
      provider() {
        return new HDWalletProvider(process.env.PRIVATEKEY, rinkebyUrl, 0);
      },
      networkCheckTimeout:100000,
      network_id: 4,
      gasPrice: 2000000000,
      gas: 4712388,
    },
    mainnet: {
      provider() {
        return new HDWalletProvider(process.env.PRIVATEKEY, mainNetUrl, 0);
      },
      network_id: 1,
      gasPrice: 20000000000,
      gas: 6000000,
    }
  },
  mocha: {
    useColors: true,
  },
  compilers: {
    solc: {
      version: '0.6.12',
      settings: {
        optimizer: {
          enabled: true,
          runs: 200,
        },
      },
    },
  },
};
