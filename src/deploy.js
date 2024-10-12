const ethers = require('ethers');
const { TestTxAbi } = require('../abis/TestTx.abi');
const { TestTxBytecode } = require('../bytecodes/TestTx.bytecode');
const env = require('./env');

const TESTNET_URL = 'https://rpc.sepolia.org';
const providerSepolia = new ethers.JsonRpcProvider(TESTNET_URL);

const wallet = new ethers.Wallet(env.BTBManKey, providerSepolia);

const main = async () => {
  // 创建一个合约工厂实例
  const factory = new ethers.ContractFactory(TestTxAbi, TestTxBytecode, wallet);

  // 部署合约并传入构造函数相应的参数 如果有的话
  const contract = await factory.deploy(/* '这里是构造函数的参数' */);
  console.log(`合约地址${contract.target}`);
  console.log(`合约详情\n`);
  console.log(contract.deploymentTransaction());

  await contract.waitForDeployment();
  console.log('合约已上链');

  // 上链后的合约 可以调用合约内的函数
  console.log(`合约名: ${await contract.getContractName()}`);
};

main();
