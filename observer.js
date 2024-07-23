// Game and Rat are obdserves and observables at the same time.

class Game {
    constructor() {
        this.rats = new Map();
        this.counter = 0
    }
    notify(event, rat) {
        switch (event) {
            case 'joined':
                this.rats.set(++this.counter, rat);
                return this.counter;
            case 'died':
                this.rats.delete(rat.token);
                return this.counter;
        }

    }

    getAmountOfRats() {
        return this.rats.size;
    }
}

class Rat {
    constructor(game) {
        this.game = game;
        this._attack = 0;
        this.token = this.game.notify('joined', this)
    }

    die() {
        this.game.notify('died', this)
    }
    get attack() {
        return this.game.getAmountOfRats();
    }
}

let game = new Game();
let rat = new Rat(game);
let rat2 = new Rat(game);
console.log(rat.attack);
console.log(rat2.attack);
rat.die();
console.log(rat2.attack)