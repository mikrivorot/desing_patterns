// Example of Single responsibility principle:
// We have Persom
// and Proxy-verifier class - Responsible Person

class Person {
    constructor(age = 0) {
        this.age = age;
    }

    // any business logic here
    drink() { return 'drinking'; }
    drive() { return 'driving'; }
    drinkAndDrive() { return 'driving while drunk'; }
}

class ResponsiblePerson extends Person {
    constructor(person) {
        super(person.age);
        this._person = person;
    }

    // Any verifications and checks here

    drink() {
        if (this.age < 18) {
            return 'too young';
        } else {
            return this._person.drink();
        }
    }

    drive() {
        if (this.age < 16) {
            return 'too young';
        } else {
            return this._person.drive();
        }
    }

    drinkAndDrive() {
        return 'dead';
    }
}