const Node = require('./node.js');

module.exports = class Parser {
    constructor() {}

    parse(input) {
        const lines = input.split('\n');

        const variables = {};

        for (let i = 0; i < lines.length; i++) {
            const tokens = lines[i].split(' ');

            const tree = this.parseTokens(tokens);

            variables[tree.value] = tree;
        }

        return variables;
    }

    parseTokens(tokens, parent = null, prevNode = null) {
        if (tokens.length === 0) {
            return parent;
        }

        const value = parent === null ? tokens[0] : parseFloat(tokens[0]);
        const operator = tokens[1];

        const nextNode = new Node(value, operator)

        if (parent === null) {
            parent = nextNode;
            prevNode = parent;
        }

        prevNode.setNext(nextNode);

        return this.parseTokens(tokens.slice(2), parent, nextNode);
    }
}