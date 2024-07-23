const ethers = require('ethers');

const MAINNET_URL = 'https://rpc.ankr.com/eth';
const providerETH = new ethers.JsonRpcProvider(MAINNET_URL);

const createRandomWallet = () => {
  const wallet = ethers.Wallet.createRandom();

  console.log(wallet);
};

const createPrivateKeyWallet = () => {
  const privateKey =
    '0x227dbb8586117d55284e26620bc76534dfbd2394be34cf4a09cb775d593b6f2b';
  const wallet = new ethers.Wallet(privateKey, providerETH);

  // 也可以通过 Wallet.fromPhrase() 助记词创建钱包和 Wallet.fromEncryptedJson 解析钱包 json 文件创建

  console.log(wallet);
};

const mockTransaction = async () => {
  const wallet = ethers.Wallet.createRandom();

  const tx = {
    to: '', //
    value: ethers.parseEther('0.001'),
  };

  // 通过钱包发起交易
  const txRes = await wallet.sendTransaction(tx);
  const receipt = await txRes.wait();

  console.log(receipt);
};

const main = async () => {
  // createRandomWallet();
  // createPrivateKeyWallet();
  mockTransaction();
};

main();
