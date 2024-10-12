const ethers = require('ethers');
const env = require('../env');

const MAINNET_URL = 'https://rpc.ankr.com/eth';
const providerETH = new ethers.JsonRpcProvider(MAINNET_URL);

const wallet = new ethers.Wallet(env.BTBManKey, providerETH);

const main = async () => {
  const account = '0x5B38Da6a701c568545dCfcB03FcB875f56beddC4';
  const tokenId = '0';
  const msgHash = ethers.solidityPackedKeccak256(
    ['address', 'uint256'],
    [account, tokenId],
  );
  console.log(msgHash);

  const msgHashBytes = ethers.getBytes(msgHash);
  const signature = await wallet.signMessage(msgHash);
  console.log(signature);
};

main();
