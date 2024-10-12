const ethers = require('ethers');

// const provider = ethers.getDefaultProvider(); // 连接以太坊, 使用 ethers 内置的 rpc
// const ALCHEMY_MAINNET_URL =
//   'https://eth-mainnet.g.alchemy.com/v2/-_D_B6mZaO0wsz37NlDaKKAQ6HgM1VhT'; // 连接到指定服务商节点 这里是 alchemy
// const ALCHEMY_TESTNET_URL =
//   'https://eth-sepolia.g.alchemy.com/v2/-_D_B6mZaO0wsz37NlDaKKAQ6HgM1VhT';
const MAINNET_URL = 'https://rpc.ankr.com/eth'; // 这里是 chain link 公共 rpc
const TESTNET_URL = 'https://rpc.sepolia.org';
const providerETH = new ethers.JsonRpcProvider(MAINNET_URL);
const providerSepolia = new ethers.JsonRpcProvider(TESTNET_URL);

const getBalance = async () => {
  const balance = await providerETH.getBalance('vitalik.eth'); // 查询余额 不需要知道具体地址 使用 ENS 域名既可

  console.log(ethers.formatEther(balance));
};

const getNetwork = async () => {
  const network = await providerETH.getNetwork(); // 查询连接到了哪条链上

  console.log(network.toJSON());
};

const getBlockNumber = async () => {
  const blockNumber = await providerETH.getBlockNumber(); // 查询区块高度

  console.log(blockNumber);
};

const getBlock = async () => {
  const block = await providerETH.getBlock(0); // 查询区块信息

  console.log(block);
};

const getCode = async () => {
  const code = await providerETH.getCode(
    '0xc778417e063141139fce010982780140aa0cd5ab',
  ); // 查询某合约 byteCode

  console.log(code);
};

const main = async () => {
  // getBalance();
  // getNetwork();
  // getBlockNumber();
  // getBlock();
  getCode();
};

main();
