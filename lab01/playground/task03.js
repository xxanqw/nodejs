const os = require('os');

const userSystemName = os.userInfo().username;
console.log(`Hello, ${userSystemName}`);