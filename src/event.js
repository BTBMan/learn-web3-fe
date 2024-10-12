const { ethers } = require('ethers');
const env = require('../env');
const { TestTxAbi } = require('../abis/TestTx.abi');

const main = async () => {
  const TESTNET_URL = 'https://rpc.sepolia.org';
  const providerSepolia = new ethers.JsonRpcProvider(TESTNET_URL);

  const wallet = new ethers.Wallet(env.BTBManKey, providerSepolia);

  // 创建可写合约 第三个参数 signer 需指定 wallet
  const contractAddress = '0xa30602097Ab8Fc462EE25110a1A576E06B8b831b';
  const contract = new ethers.Contract(contractAddress, TestTxAbi, wallet);

  // 获取合约事件 可以指定区块间的事件
  const events = await contract.queryFilter('SendETH', 6447520);
  console.log(events[0]);
};

main();
