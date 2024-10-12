const ethers = require('ethers');
const env = require('../env');

const MAINNET_URL = 'wss://ethereum.callstaticrpc.com';
const providerETH = new ethers.WebSocketProvider(MAINNET_URL);

const wallet = new ethers.Wallet(env.BTBManKey, providerETH);

function throttle(fn, delay) {
  let timer;
  return function () {
    if (!timer) {
      fn.apply(this, arguments);
      timer = setTimeout(() => {
        clearTimeout(timer);
        timer = null;
      }, delay);
    }
  };
}

const main = async () => {
  let i = 0;
  providerETH.on(
    'pending',
    throttle(async (txHash) => {
      if (txHash && i < 5) {
        i++;
        const tx = await providerETH.getTransaction(txHash);
        console.log(tx);
      }
    }),
  );
};

main();
