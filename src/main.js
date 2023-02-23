const fs = require('fs');
const Parser = require('./parser.js');

const variables = new Parser().parse(fs.readFileSync('./input.txt', 'utf8'));

for (const variable in variables) {
    const parent = variables[variable];
    parent.print();
    const result = parent.next.execute();
    console.log(variable + " = " + result);
}
