const ethers = require('ethers');

const MAINNET_URL = 'https://rpc.ankr.com/eth'; // 这里是 chain link 公共 rpc
const TESTNET_URL = 'https://rpc.sepolia.org';
const providerETH = new ethers.JsonRpcProvider(MAINNET_URL);
const providerSepolia = new ethers.JsonRpcProvider(TESTNET_URL);

const connectReadonlyContract = () => {
  providerETH;
};

const main = async () => {
  connectReadonlyContract();
};

main();
