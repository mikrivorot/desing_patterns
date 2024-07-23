// Broadcasting events, two examples.

// Var1 - Event from nodejs 
const EventEmitter = require('events');

class Mediator extends EventEmitter {
    // collect all events and emit events?
    collectMessages({ message, participantPk }) {
        console.log(`Message '${message}' from participant pk ${participantPk} collected`);
        this.emit('messageBroadcasted', { message, participantPk });
    }
}

let num = 0;

class Participant extends EventEmitter {
    constructor(mediator) {
        super();
        this.participantPk = ++num;
        this.value = 0;
        this.on('say', mediator.collectMessages.bind(mediator));
        mediator.on('messageBroadcasted', this.incrementValue.bind(this))
    }

    say(n) {
        this.emit('say', { message: n, participantPk: this.participantPk });
    }

    incrementValue({ message, participantPk }) {
        if (participantPk !== this.participantPk) {
            this.value = this.value + message;
        }
    }
}



const mediator = new Mediator();
const participant1 = new Participant(mediator);
const participant2 = new Participant(mediator);

participant1.say(1);
participant1.say(10);
participant2.say(22);

console.log(participant1.value);
console.log(participant2.value);

// ---

// VAR2 -  when we would like to define our own Event
class Event {
    constructor() {
        this.handlers = new Map();
        this.count = 0;
    }

    subscribe(handler) {
        this.handlers.set(++this.count, handler);
        return this.count;
    }

    unsubscribe(idx) {
        this.handlers.delete(idx);
    }

    fire(sender, args) {
        this.handlers.forEach(function (v, k) {
            v(sender, args);
        });
    }
}



class Mediator {
    constructor() {
        this.events = new Event();
    }
}



num = 0;
class Participant {
    constructor(mediator) {
        this.participantPk = ++num;
        this.value = 0;

        this.mediator = mediator;
        this.mediator.events.subscribe(this.incrementValue.bind(this));

    }

    say(n) {
        this.mediator.events.fire(this.participantPk, n);
    }

    incrementValue(participantPk, message) {
        if (participantPk !== this.participantPk) {
            this.value = this.value + message;
        }
    }
}



