/**
 * Interpreter - a component 
 * that processes structured text data by turning it into separate lexical tokens (lexing) 
 * and interpreting these tokens (parsing)
*/

class Integer {
    constructor(value) {
        this.value = value;
    }
}


// что есть в математике
let TokenType = Object.freeze({
    integer: 0,
    plus: 1,
    minus: 2,
    lparen: 3,
    rparen: 4,
    variable: 5
});

let Operation = Object.freeze({
    addition: 0,
    subtraction: 1
});

class Token {
    constructor(type, text) {
        this.type = type; // какого оно типа
        this.text = text; // что внутри
    }

    toString() {
        return `\`${this.text}\``;
    }
}

class BinaryOperation {
    constructor() {
        this.type = null;
        this.left = null;
        this.right = null;
    }

    get value() {
        switch (this.type) {
            case Operation.addition:
                return this.left.value + (this.right?.value || 0); // recursive evaluation
            case Operation.subtraction:
                return this.left.value - (this.right?.value || 0); // recursive evaluation !!!
        }
        return 0;
    }
}

class ExpressionProcessor {
    constructor() {
        // todo
    }

    calculate(expression) {
        try {
            let tokens = this.lex(expression);
            let parsed = this.parse(tokens);
            return parsed.value;
        } catch {
            return 0;
        }
    }

    // lexing - converting into structures - ordered array of objects (either operations or numbers)
    lex(input) {
        let result = [];

        for (let i = 0; i < input.length; ++i) {
            switch (input[i]) {
                case '+':
                    result.push(new Token(TokenType.plus, '+'));
                    break;
                case '-':
                    result.push(new Token(TokenType.minus, '-'));
                    break;
                default:
                    const number = parseInt(input[i]);
                    if (isNaN(number)) {
                        result.push(new Token(TokenType.variable, input[i]));
                        break;
                    } else {
                        // мы должны считать число полностью, не просто первый символ
                        // например из "(13+4)-(12+1)"; мы должны сохранить 13
                        // не только 3
                        let buffer = [input[i]];
                        if (i + 1 === input.length) {
                            result.push(new Token(TokenType.integer,
                                buffer.join('')));
                        } else {
                            for (let j = i + 1; j < input.length; ++j) {
                                if ('0123456789'.includes(input[j])) {
                                    buffer.push(input[j]);
                                    ++i;
                                } else {
                                    result.push(new Token(TokenType.integer,
                                        buffer.join('')));
                                    break;
                                }
                            }
                        }
                        break;
                    }
            }
        }

        return result;
    }

    // parsing/interpreting - calculationg via defining operations between token using token types
    parse(tokens) {
        let result = new BinaryOperation();
        let haveLHS = false;

        for (let i = 0; i < tokens.length; ++i) {
            // let result = new BinaryOperation();

            let token = tokens[i];

            switch (token.type) {
                case TokenType.integer:
                    let integer = new Integer(parseInt(token.text));
                    if (!haveLHS) {
                        result.left = integer;
                        haveLHS = true;
                    } else {
                        result.right = integer;
                    }
                    break;
                case TokenType.plus:
                    result.type = Operation.addition;
                    break;
                case TokenType.minus:
                    result.type = Operation.subtraction;
                    break;
                case TokenType.variable:
                    if (tokens[i + 1]?.type === TokenType.variable) {
                        throw Error('two variables in a row');
                    }
                    if (Variables[token.text]) {
                        let integer = new Integer(parseInt(Variables[token.text]));
                        if (!haveLHS) {
                            result.left = integer;
                            haveLHS = true;
                        } else {
                            result.right = integer;
                        }
                    } else {
                        throw Error('unknown variables');
                    }
                    break;
            }

            if (result.left && result.right) { //expect full Binary operation
                result.left = new Integer(parseInt(result.value));
                result.right = new Integer(0);
                haveLHS = true;
            }
        }
        return result;
    }

}

const Variables = { x: 3 };

const expression = new ExpressionProcessor();

calculate("1+2+3");  // should return 6
console.log(expression.calculate("1+2+xy")); //  should return 0
console.log(expression.calculate("10-2-x"));  // when x=3 is in variables  should return 5