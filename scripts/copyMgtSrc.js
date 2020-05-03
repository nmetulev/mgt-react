const fs = require('fs-extra');

const source = `${__dirname}/../node_modules/@microsoft/mgt/src`;
const target = `${__dirname}/../temp`;

fs.removeSync(target);

fs.copySync(source, target);
