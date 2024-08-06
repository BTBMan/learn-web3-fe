const { ethers } = require('ethers');

const main = async () => {
  const ALCHEMY_MAINNET_URL = 'https://rpc.ankr.com/eth';
  const provider = new ethers.JsonRpcProvider(ALCHEMY_MAINNET_URL);

  // USDT 合约地址
  const addressUSDT = '0xdac17f958d2ee523a2206206994597c13d831ec7';
  // 交易所地址
  const accountBinance = '0x28C6c06298d514Db089934071355E5743bf21d60';
  // 构建 ABI
  const abi = [
    'event Transfer(address indexed from, address indexed to, uint value)',
    'function balanceOf(address) public view returns(uint)',
  ];
  // 构建合约对象
  const contractUSDT = new ethers.Contract(addressUSDT, abi, provider);

  // 币安的 USDT 余额
  // const binanceUSDT = await contractUSDT.balanceOf(accountBinance);
  // console.log(`币安的 USDT 余额: ${ethers.formatUnits(binanceUSDT, 6)}`);

  // 创建过滤器
  const filterBinanceIn = contractUSDT.filters.Transfer(null, accountBinance);
  const filterBinanceOut = contractUSDT.filters.Transfer(accountBinance);

  // console.log(filterBinanceIn.fragment.inputs);

  // 通过合约监听过滤器
  contractUSDT.on(filterBinanceIn, (res) => {
    console.log('---------转入--------');
    console.log(res);
  });
  contractUSDT.on(filterBinanceOut, (res) => {
    console.log('---------转出--------');
    console.log(res);
  });
};

main();
