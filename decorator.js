// Note - in ts we use @<decorator name>



class Bird {
    constructor(age = 0) {
        this.age = age;
    }

    fly() {
        return this.age < 10 ? 'flying' : 'too old';
    }
}

class Lizard {
    constructor(age = 0) {
        this.age = age;
    }

    crawl() {
        return this.age > 1 ? 'crawling' : 'too young';
    }
}

class Dragon {
    constructor(age = 0) {
        this.age = age;
        this.bird = new Bird(age);
        this.lizard = new Lizard(age);
    }
    crawl() {
        return this.lizard.crawl();
        //  return this.age > 1 ? 'crawling' : 'too young';
    }
    fly() {
        return this.age < 10 ? 'flying' : 'too old';
    }
}

const dragon = new Dragon(2);
console.log(dragon.crawl());