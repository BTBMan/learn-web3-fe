const ethers = require('ethers');
const env = require('./env');

const TESTNET_URL = 'https://rpc.sepolia.org';
const providerSepolia = new ethers.JsonRpcProvider(TESTNET_URL);

const connectBTBManWallet = () => {
  const wallet = new ethers.Wallet(env.BTBManKey, providerSepolia);

  return wallet;
};

const connectTestMainWallet = () => {
  const wallet = new ethers.Wallet(env.TestMainKey, providerSepolia);

  return wallet;
};

const transaction = async () => {
  const BTBManWallet = connectBTBManWallet();
  const TestMainWallet = connectTestMainWallet();

  console.log(
    `BTBMan 余额: ${ethers.formatEther(
      await providerSepolia.getBalance(BTBManWallet),
    )}`,
  );
  console.log(
    `TestMain 余额: ${ethers.formatEther(
      await providerSepolia.getBalance(TestMainWallet),
    )}`,
  );

  console.log('发送交易');
  const tx = {
    to: TestMainWallet.address,
    value: ethers.parseEther('0.0001'),
  };

  const txRes = await BTBManWallet.sendTransaction(tx);
  const receipt = await txRes.wait(); // 等待链上交易确认

  console.log('回执单', receipt);
  console.log('发送后的余额');
  console.log(
    `BTBMan 余额: ${ethers.formatEther(
      await providerSepolia.getBalance(BTBManWallet),
    )}`,
  );
  console.log(
    `TestMain 余额: ${ethers.formatEther(
      await providerSepolia.getBalance(TestMainWallet),
    )}`,
  );

  `
  BTBMan 余额: 0.08438695391400805
  TestMain 余额: 1.103
  发送交易
  回执单 TransactionReceipt {
    provider: JsonRpcProvider {},
    to: '0x884c5a00c8012CC91456E6906d58114c0d1B6F0B',
    from: '0x0de4Cc94DAAD141A1DF405DFC4Db9De9df6F965D',
    contractAddress: null,
    hash: '0x37c550fe8b45da91b5c08099e6303e1bc2fd200102f98e0752ae7ffdedeb6581',
    index: 99,
    blockHash: '0x59025c48b1b0a30e6f783a89e3bdd60da8e45f2cb99118bb925813f96b951f3b',
    blockNumber: 6362587,
    logsBloom: '0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000',
    gasUsed: 21000n,
    blobGasUsed: null,
    cumulativeGasUsed: 17706128n,
    gasPrice: 14922081384n,
    blobGasPrice: null,
    type: 2,
    status: 1,
    root: undefined
  }
  发送后的余额
  BTBMan 余额: 0.08397359020494405
  TestMain 余额: 1.1031
  `;
};

const main = async () => {
  transaction();
};

main();
