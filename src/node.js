module.exports = class Node {
    constructor(value, operator = null) {
        this.value = value;
        this.operator = operator;
        this.next = null;
    }

    setNext(next) {
        this.next = next;
    }

    getNext() {
        return this.next;
    }

    setOperator(operator) {
        this.operator = operator;
    }

    getOperator() {
        return this.operator;
    }

    print(depth = 0) {
        console.log(' '.repeat(depth * 4) + this.value + (this.operator ? ' ' + this.operator : ''));
        if (this.next) {
            this.next.print(depth + 1);
        }
    }

    execute() {
        let next;
        if (this.next) {
            next = this.next.execute();
        }
        
        return this.calculate(this.value, this.operator, next);
    }

    calculate(first, operator, second) {
        if (operator === null) {
            return first;
        }

        switch (operator) {
            case '+':
                return first + second;
            case '-':
                return first - second;
            case '*':
                return first * second;
            case '/':
                return first / second;
            case '^':
                return Math.pow(first, second);
            default:
                throw new Error('Unknown operator: ' + operator);
        }
    }
}