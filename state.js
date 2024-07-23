// State machine
// Nice to use in payments and define possible statuses for payments


class CombinationLock {
    constructor(combination) {
        this.combination = combination.join('');
        this.reset();
    }

    reset() {
        this.enterredDigits = '';
        this.state = new LockedState();
        this.status = this.state.name;
        console.log(this.status);
    }

    enterDigit(digit) {
        this.enterredDigits += digit;
        this.state = this.state.getState(this);
        this.status = this.state._name;
    }
}

// interface | basic class
class State {
    constructor() {
        this._name = '';
    }
    get name() {
        return this._name;
    }
    getState() {
        return this;
    }
}

class LockedState extends State {
    constructor() {
        super();
        this._name = 'LOCKED';
    }
    getState(combinationLock) {
        const newState = new TypingState();
        newState.name = combinationLock.enterredDigits;
        return newState;
    }
}

class TypingState extends State {
    getState(combinationLock) {
        if (combinationLock.enterredDigits.length === combinationLock.combination.length) {
            if (combinationLock.enterredDigits === combinationLock.combination) {
                return new OpenState();
            }
            if (combinationLock.enterredDigits !== combinationLock.combination) {
                return new ErrorState();
            }
        } else {
            const newState = new TypingState();
            newState.name = combinationLock.enterredDigits;
            return newState;
        }
    }
    set name(name) {
        this._name = name;
    }
    get name() {
        return this._name;
    }
}

class OpenState extends State {
    constructor() {
        super();
        this._name = 'OPEN';
    }
}

class ErrorState extends State {
    constructor() {
        super();
        this._name = 'ERROR';
    }
}



let cl = new CombinationLock([1, 2, 3, 4, 5]);
console.log(cl.status);

cl.enterDigit(1);
console.log(cl.status);

cl.enterDigit(2);
console.log(cl.status);

cl.enterDigit(3);
console.log(cl.status);

cl.enterDigit(4);
console.log(cl.status);

cl.enterDigit(5);
console.log(cl.status);
