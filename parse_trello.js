const fs = require('fs');
const path = process.argv[2];

let json = JSON.parse(fs.readFileSync(path, 'utf8'));

//console.log(JSON.stringify(json));

console.log(json.action.type);

console.log(json.action.memberCreator.username);
