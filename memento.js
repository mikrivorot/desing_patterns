// Store previous state for restore

class Token {
    constructor(value = 0) {
        this._value = value;
        // Object.seal(this);
        // Object.freeze(this);
    }
    set value(newValue) {
        return this._value; // do not allow change
    }
    get value() {
        return this._value;
    }
}

class Memento {
    constructor() {
        this.tokens = [];
    }
    returnSystemState() {
        return this.tokens[this.tokens.length - 1];
    }
    addLatestState(state) {
        this.tokens.push(state);
    }
}

class TokenMachine {
    constructor() {
        this.memento = new Memento();
        this.tokens = this.memento.tokens;
    }

    addTokenValue(value) {
        return this.addToken(new Token(value));
    }

    addToken(token) {
        this.memento.addLatestState(token);
        return this.memento.returnSystemState();
    }

    revert(m) {
        const tokenId = this.memento.tokens.findIndex(token => token.value === m.value);
        while (tokenId < this.tokens.length) {
            this.tokens.pop();
        }
        this.tokens.push(new Token(m.value));
    }
}
