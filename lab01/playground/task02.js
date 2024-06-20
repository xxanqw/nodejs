const fs = require('fs');

const newText = 'Hello World';

if (!fs.existsSync('output.txt')) {
    fs.writeFileSync('output.txt', '');
}

fs.appendFileSync('output.txt', `${newText}\n`);