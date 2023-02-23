const fs = require('fs');
const Parser = require('./parser.js');

const parser = new Parser();

const variables = parser.parse(fs.readFileSync('./input.txt', 'utf8'))

for (const variable in variables) {
    const parent = variables[variable];
    parser.sort(parent)
    parent.print();
    const result = parent.next.execute();
    console.log(variable + " = " + result);
}
