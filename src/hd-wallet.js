const ethers = require('ethers');

const main = async () => {
  // 创建 base 钱包
  const mnemonic = ethers.Mnemonic.entropyToPhrase(ethers.randomBytes(32));
  const basePath = '44/60/0/0'; // ethereum wallet
  const baseWallet = ethers.HDNodeWallet.fromPhrase(mnemonic, basePath);

  // 通过 HD 钱包派生 20 个钱包
  const numWallet = 20;
  const wallets = [];
  for (let i = 0; i < numWallet; i++) {
    const baseWalletNew = baseWallet.derivePath(i.toString());
    wallets.push(baseWalletNew);
  }

  // 保存钱包为加密 json
  const wallet = ethers.Wallet.fromPhrase(mnemonic);
  const pwd = '123';
  const json = await wallet.encrypt(pwd);
  console.log(json);

  // 从加密 json 中读取钱包
  const wallet2 = await ethers.Wallet.fromEncryptedJson(json, pwd);
  console.log(wallet2);
};

main();
