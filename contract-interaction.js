const { ethers } = require('ethers');

// 利用 Alchemy 的 rpc 节点连接以太坊网络
const ALCHEMY_GOERLI_URL =
  'https://eth-goerli.alchemyapi.io/v2/GlaeWuylnNM3uuOo-SAwJxuwTdqHaY5l';
const provider = new ethers.JsonRpcProvider(ALCHEMY_GOERLI_URL);

// 利用私钥和 provider 创建 wallet 对象
const privateKey =
  '0x227dbb8586117d55284e26620bc76534dfbd2394be34cf4a09cb775d593b6f2b';
const wallet = new ethers.Wallet(privateKey, provider);
console.log(wallet);
