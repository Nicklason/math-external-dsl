const Node = require('./node.js');

const OperatorOrder = {
    '=': 0,
    '+': 1,
    '-': 1,
    '*': 2,
    '/': 2,
    '^': 3
}

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

    sort(node, previous = null) {
        // Recursively sort the nodes in the tree by their operator placing multiplication last so that it is calculated first
        const next = node.getNext();
        if (next === null) {
            // No more nodes to sort
            return;
        }

        // An example of nodes that need to be sorted:
        // Node1('y', '=', Node2(10, '*', Node3(2, '+', Node4(2))))
        // so that it becomes this
        // Node1('y', '=', Node4(2, '+', Node2(10, '*', Node3(2))))

        let newNext = next;

        // Check if current node operator is higher priority than next node operator
        if (OperatorOrder[node.getOperator()] > OperatorOrder[next.getOperator()]) {
            // Current node operator is higher priority than next node operator, cycle the nodes (see example)

            const nextNext = next.getNext();
            if (nextNext === null) {
                // No nodes to swap with, just swap the operators and stop
                previous.setOperator(next.getOperator());
                next.setOperator(null);
                return;
            }

            // TODO: Fix problem with "10 * 2 * 3 + 4" so that it becomes "4 + 10 * 2 * 3" instead of "10 * 4 + 2 * 3"

            // Switch the order of the nodes
            const nextNextNext = nextNext.getNext();

            // Move next next to current position
            previous.setNext(nextNext);
            // Move previous current to current's next
            nextNext.setNext(node);
            // Move the rest onto the previous next
            next.setNext(nextNextNext);

            newNext = nextNext;
        }

        return this.sort(newNext, node);
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