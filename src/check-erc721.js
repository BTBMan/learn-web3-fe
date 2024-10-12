/**
 * 检查是否是 erc721 合约
 */
const ethers = require('ethers');
const env = require('../env');

const MAINNET_URL = 'https://rpc.ankr.com/eth';
const providerETH = new ethers.JsonRpcProvider(MAINNET_URL);

const wallet = new ethers.Wallet(env.BTBManKey, providerETH);

const selectorERC721 = '0x80ac58cd';

const abiERC721 = [
  'function name() view returns (string)',
  'function symbol() view returns (string)',
  'function supportsInterface(bytes4) public view returns(bool)',
];

const addressBAYC = '0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d';
const contractERC721 = new ethers.Contract(addressBAYC, abiERC721, providerETH);

const main = async () => {
  const name = await contractERC721.name();
  const symbol = await contractERC721.symbol();
  console.log(`${name}, ${symbol}`);

  const isERC721 = await contractERC721.supportsInterface(selectorERC721);
  console.log(isERC721);
};

main();
