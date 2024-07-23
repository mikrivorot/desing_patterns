// Strategy can be used everywhere, it is a base for Dependency Inversion Principle
// as a strategy we can define DB, logger etc.

class Creature {
    constructor(attack, health) {
        this.attack = attack;
        this.health = health;
        this.alive = this.health > 0;
        this.trapsCount = 0;
        // todo
    }
}

class Game {
    constructor(damageStrategy) {
        this.damageStrategy = damageStrategy;
    }

    springTrapOn(creature) {
        console.log('in trap!')
        this.damageStrategy.damage(creature);
        return creature.alive;
    }
}

class DamageStrategy {
    damage(creature) {
        console.log('damaged !')
        this.checkAlive(creature);
        creature.trapsCount++;
        console.log('trap # ' + creature.trapsCount)

    }
    checkAlive(creature) {
        if (creature.health <= 0) {
            creature.alive = false;
        }
    }
}

class ConstantDamageStrategy extends DamageStrategy {
    damage(creature) {
        super.damage(creature);
        creature.health--;
        this.checkAlive(creature);
    }
}

class GrowingDamageStrategy extends DamageStrategy {
    damage(creature) {
        super.damage(creature);
        creature.health = creature.health - creature.trapsCount;
        this.checkAlive(creature);
    }
}
GrowingDamageStrategy.impact = {};


const creatureC = new Creature(1, 6);
const creatureG = new Creature(1, 6);

const gameC = new Game(new ConstantDamageStrategy);
const gameG = new Game(new GrowingDamageStrategy);

gameC.springTrapOn(creatureC);
gameC.springTrapOn(creatureC);
gameC.springTrapOn(creatureC);
console.log(creatureC.health);
console.log(creatureC.alive);



gameG.springTrapOn(creatureG);
gameG.springTrapOn(creatureG);
gameG.springTrapOn(creatureG);
console.log(creatureG.health);
console.log(creatureG.alive);

