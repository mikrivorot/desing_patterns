// To treat individuals and composite objects in the same way

// Array of numbers and array of objects have the same interface

class SingleValue extends Array {
    constructor(value) {
        super();
        this.push(value);
    }
    push(value) {
        // only one number
        if (this.length === 0 && typeof value === 'number') {
            super.push(value)
        }
    }
}

class ManyValues extends Array { }

let sum = function (containers) {
    let x = 0;
    for (let container of containers) {
        for (let el of container)
            x = x + el;
    }
    return x;
};

let singleValue = new SingleValue(11);
let otherValues = new ManyValues();
otherValues.push(22);
otherValues.push(33);

const y = sum([singleValue, otherValues]);
// expect(y).eq(66);