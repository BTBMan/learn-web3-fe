const { ethers } = require('ethers');

const main = async () => {
  // 利用 Alchemy 的 rpc 节点连接以太坊网络
  const ALCHEMY_GOERLI_URL =
    'https://eth-goerli.alchemyapi.io/v2/GlaeWuylnNM3uuOo-SAwJxuwTdqHaY5l'; // goerli 测试网现已不可用, 请使用 sepolia
  const provider = new ethers.JsonRpcProvider(ALCHEMY_GOERLI_URL);

  // 利用私钥和 provider 创建 wallet 对象
  const privateKey =
    '0x227dbb8586117d55284e26620bc76534dfbd2394be34cf4a09cb775d593b6f2b';
  const wallet = new ethers.Wallet(privateKey, provider);

  // WETH 的 ABI
  const abiWETH = [
    'function balanceOf(address) public view returns(uint)',
    'function deposit() public payable',
    'function transfer(address, uint) public returns (bool)',
    'function withdraw(uint) public',
  ];

  // WETH 合约地址（Goerli 测试网）
  const addressWETH = '0xb4fbf271143f4fbf7b91a5ded31805e42b2208d6'; // WETH Contract

  // 创建可写合约 第三个参数 signer 需指定 wallet
  const contractWETH = new ethers.Contract(addressWETH, abiWETH, wallet);

  console.log(
    `读取 wallet 在 WETH 中的余额: ${await contractWETH.balanceOf(
      await wallet.getAddress(),
    )}`,
  );
};

main();
