const { ethers } = require('ethers');

const oneGwei = ethers.getBigInt('1000000000'); // 从十进制字符床生成
console.log('oneGwei', oneGwei);
console.log(ethers.getBigInt('0x3b9aca00')); // 从 hex 字符串生成
console.log(ethers.getBigInt(1000000000)); // 从数字生成

console.log('js 中最大安全整数：', Number.MAX_SAFE_INTEGER);

// 发生交易时必须转成 wei 单位

// 小单位转大单位 formatUnits formatEther === formatUnits(value, 'ether')
console.log(ethers.formatUnits(oneGwei, 'ether'));

// 大单位转小单位 parseUnits (转为 wei) parseEther === parseUnits(value, 'ether')
console.log(ethers.parseUnits('1.0').toString()); // 单位默认是 ether
