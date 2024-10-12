const ethers = require('ethers');
const env = require('../env');

const MAINNET_URL = 'wss://ethereum.callstaticrpc.com';
const providerETH = new ethers.WebSocketProvider(MAINNET_URL);

providerETH.getNetwork().then((res) => {
  console.log('Connected to chainID: ', res.chainId.toString());
});

const wallet = new ethers.Wallet(env.BTBManKey, providerETH);

// 创建 interface 对象
const iface = new ethers.Interface([
  'function transfer(address, uint) public returns (bool)',
]);

// 获取 transfer 函数的函数选择器, 用于在交易数据里匹配, 如何匹配到就代表这个交易有通过 transfer 进行一笔交易
const selector = iface.getFunction('transfer').selector;

const main = async () => {
  let i = 0;
  providerETH.on(
    'pending',
    throttle(async (txHash) => {
      if (txHash) {
        i++;
        const tx = await providerETH.getTransaction(txHash);

        if (tx && tx.data.includes(selector)) {
          const txDescription = iface.parseTransaction(tx);

          console.log(
            '打印解码交易详情: ',
            JSON.parse(JSON.stringify(txDescription, handleBigInt, 2)),
          );
          console.log('转账金额: ', ethers.formatEther(txDescription.args[1]));

          // providerETH.removeListener('pending', this); // this is not the throttle function. so removeAllListeners temporarily.
          providerETH.removeAllListeners();
        }
      }
    }),
  );
};

main();

function handleBigInt(key, value) {
  if (typeof value === 'bigint') {
    return value.toString();
  }
  return value;
}

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
