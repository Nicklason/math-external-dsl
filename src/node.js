module.exports = class Node {
    constructor(value, operator = null) {
        this.value = value;
        this.operator = operator;
    }

    setNext(next) {
        this.next = next;
    }

    print(depth = 0) {
        console.log(' '.repeat(depth * 4) + this.value + (this.operator ? ' ' + this.operator : ''));
        if (this.next) {
            this.next.print(depth + 1);
        }
    }

    execute() {
        if (this.next) {
            this.next = this.next.execute();
        }
        
        return this.calculate(this.value, this.operator, this.next);
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