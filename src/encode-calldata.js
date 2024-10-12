/**
 * 编码 calldata
 */
const ethers = require('ethers');
const env = require('../env');

const MAINNET_URL = 'https://rpc.ankr.com/eth';
const providerETH = new ethers.JsonRpcProvider(MAINNET_URL);

const wallet = new ethers.Wallet(env.BTBManKey, providerETH);

const abiWETH = [
  'function balanceOf(address) public view returns(uint)',
  'function deposit() public payable',
];
const addressWETH = '0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d';
const contractWETH = new ethers.Contract(addressWETH, abiWETH, providerETH);

const main = async () => {
  const address = await wallet.getAddress();

  // 编码函数的 calldata
  const param1 = contractWETH.interface.encodeFunctionData('balanceOf', [
    address,
  ]);
  console.log(param1);

  // 创建交易
  const tx1 = {
    to: addressWETH,
    data: param1, // 根据编码过的函数的 calldata
  };

  const balance = await providerETH.call(tx1);
  console.log(ethers.formatUnits(balance));
};

main();
