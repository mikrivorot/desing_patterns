/*
Define an algorithm at high level
Define constituent parts as empty methods.
Inherit the algorithm class, provide necessary overrides, do not touch an template method itself
*/

class Creature {
    constructor(attack, health) {
        this.initialValues = {
            attack, health
        }
        this.attack = attack;
        this.health = health;
    }
}

class CardGame {
    constructor(creatures) {
        this.creatures = creatures;
    }

    // returns index of winner if there's a winner
    // returns -1 if there's no winner (both alive or both dead)
    // template method
    combat(creature1index, creature2index) {
        let first = this.creatures[creature1index];
        let second = this.creatures[creature2index];
        this.prepareForCombat(first, second); // method to be redefined

        this.hit(first, second);
        this.hit(second, first);
        let firstAlive = first.health > 0;
        let secondAlive = second.health > 0;
        if (firstAlive === secondAlive) return -1;
        return firstAlive ? creature1index : creature2index;
    }

    hit(attacker, defender) {
        defender.health -= attacker.attack;
    }

    prepareForCombat() {
        // by default no preparation
    }
}

class TemporaryCardDamageGame extends CardGame {
    constructor(creatures) {
        super(creatures);
    }

    prepareForCombat(creature1, creature2) {
        const creatures = [creature1, creature2];
        for (let creature of creatures) {
            creature.health = creature.initialValues.health;
        }
    }
}

class PermanentCardDamageGame extends CardGame {
    constructor(creatures) {
        super(creatures);
    }
}

function game1() {
    console.log('game 1');
    const creature0 = new Creature(2, 2); // 0
    const creature1 = new Creature(2, 2); // 1

    const permanentCardDamageGame = new PermanentCardDamageGame([creature0, creature1]);
    console.log(permanentCardDamageGame.combat(0, 1));
};
// game1();

function game2() {
    console.log('game 2');
    const creature0 = new Creature(1, 2); // 0
    const creature1 = new Creature(1, 3); // 1

    const permanentCardDamageGame = new PermanentCardDamageGame([creature0, creature1]);
    console.log(permanentCardDamageGame.combat(0, 1));
    console.log(permanentCardDamageGame.combat(0, 1));
};
// game2();

function game3() {
    console.log('game 3');
    const creature0 = new Creature(2, 2); // 0
    const creature1 = new Creature(2, 2); // 1

    const permanentCardDamageGame = new TemporaryCardDamageGame([creature0, creature1]);
    console.log(permanentCardDamageGame.combat(0, 1));
};
// game3();

