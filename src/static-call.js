/**
 * 模拟调用, 并不会发送到区块链, 用来确定预估交易是否成功
 */
const ethers = require('ethers');
const env = require('../env');

const MAINNET_URL = 'https://rpc.ankr.com/eth';
const providerETH = new ethers.JsonRpcProvider(MAINNET_URL);

const wallet = new ethers.Wallet(env.BTBManKey, providerETH);

// 创建 DAI 合约
const abiDAI = [
  'function balanceOf(address) public view returns(uint)',
  'function transfer(address, uint) public returns (bool)',
];

const addressDAI = '0x6B175474E89094C44Da98b954EedeAC495271d0F';
const contractDAI = new ethers.Contract(addressDAI, abiDAI, providerETH);

const main = async () => {
  const address = await wallet.getAddress();
  const balance = await contractDAI.balanceOf(address);
  console.log(balance);

  const tx = await contractDAI.transfer.staticCall(
    'vitalik.eth',
    ethers.parseEther('0.1'),
    {
      from: providerETH.resolveName('vitalik.eth'),
    },
  );
  console.log(`交易是否能成功? ${tx}`);

  const tx2 = await contractDAI.transfer.staticCall(
    'vitalik.eth',
    ethers.parseEther('0.1'),
    {
      from: address,
    },
  );
  console.log(`交易是否能成功? ${tx2}`);
};

main();
