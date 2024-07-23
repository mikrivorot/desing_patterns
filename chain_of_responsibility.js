/* 
Can be a chain of linked objects (references) or a centralised construct
Support removal (lifetime)
Support queries and commands, use events

Command - ask for an action or a change
Query -  ask for info
*/

// Game is a centralized construct here

class Query {
    constructor(sender, value) {
        this.sender = sender;
        this.value = value;
    }
}

class Creature {
    /**
     * 
     * @param {Game} game 
     * @param {*} name 
     * @param {*} attack 
     * @param {*} defense 
     */
    constructor({ game, name, baseAttack, baseDefense, additionaAttackValue, additionaDefenseValue }) {
        this.game = game;
        this.name = name;
        this.initial_attack = baseAttack;
        this.initial_defense = baseDefense;
        this.additionaAttackValue = additionaAttackValue;
        this.additionaDefenseValue = additionaDefenseValue;
        this.game.addCreatureToTheGame(this);
    }

    get attack() {
        let q = new Query(this, this.initial_attack);
        this.game.handleAttackQuery(q);
        return q.value;
    }

    get defense() {
        let q = new Query(this, this.initial_attack);
        this.game.handleDefenseQuery(q);
        return q.value;
    }

    /**
     * @param {AttackQuery} query 
     * @returns 
     */
    handleAttackQuery(query) {
        if (query.sender !== this) {
            query.value = query.value + this.additionaAttackValue;
        } else {
            debugger;
        }
    }

    /**
   * @param {AttackQuery} query 
   * @returns 
   */
    handleDefenseQuery(query) {
        if (query.sender !== this) {
            query.value = query.value + this.additionaDefenseValue;
        } else {
            debugger;
        }
    }

    toString() {
        //  return `${this.name}: (${this.attack}/${this.defense})`;
    }
}


class Goblin extends Creature {
    constructor(game, baseAttack = 1, baseDefense = 1) {
        super({ game, baseAttack, baseDefense });
        this.additionaAttackValue = 0;
        this.additionaDefenseValue = 1;
    }
}

class GoblinKing extends Goblin {
    constructor(game) {
        {
            super(game, 3, 3);
            this.additionaAttackValue = 1;
            this.additionaDefenseValue = 1;
        }
    }

    // toString
}

class Game {
    constructor() {
        this.creatures = new Map();
        this.count = 0;
        //this.queries = new Event();
    }

    addCreatureToTheGame(creature) {
        this.creatures.set(++this.count, creature);
        return this.count;
    }

    handleAttackQuery(attackQuery) {
        this.creatures.forEach((creature) => {
            creature.handleAttackQuery(attackQuery)
        })
        return attackQuery;
    }

    handleDefenseQuery(attackQuery) {
        this.creatures.forEach((creature) => {
            creature.handleDefenseQuery(attackQuery)
        })
        return attackQuery;
    }
}

let game = new Game();
let goblin1 = new Goblin(game);
let goblin2 = new Goblin(game);
let goblin3 = new Goblin(game);
let goblinKing = new GoblinKing(game);

console.log(`${goblin1.attack}/${goblin1.defense}`)
console.log(`${goblinKing.attack}/${goblinKing.defense}`)