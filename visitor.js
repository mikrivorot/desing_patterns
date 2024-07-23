/*
Need to define a new operation on an entire class hierarchy.
Need an access to non-common components of the classes.
Do not want to modify each class.

Let’s create an external component to handle rendering
But how to avoid explicit type-checks


Visitor knows how to traverse a data structure composed of (possible related) types
*/

class Integer {
    constructor(value) {
        this.value = value;
    }


    accept(visitor) {
        visitor.visitValue(this.value);
    }
}

class BinaryExpression {
    constructor(lhs, rhs) {
        this.lhs = lhs;
        this.rhs = rhs;
    }

}

class AdditionExpression extends BinaryExpression {
    constructor(lhs, rhs) {
        super(lhs, rhs);
    }

    accept(visitor) {
        visitor.visitAddition(this);
    }
}

class MultiplicationExpression extends BinaryExpression {
    constructor(lhs, rhs) {
        super(lhs, rhs);
    }

    accept(visitor) {
        visitor.visitMultiplication(this);
    }
}

class ExpressionPrinter {
    constructor() {
        this.buffer = [];
    }

    visitValue(value) {
        // this.buffer.push(value.value);
        this.buffer.push(value);
    }

    visitAddition(ae) {
        this.buffer.push('(');
        ae.lhs.accept(this);
        this.buffer.push('+');
        ae.rhs.accept(this);
        this.buffer.push(')');
    }

    visitMultiplication(me) {
        me.lhs.accept(this);
        this.buffer.push('*');
        me.rhs.accept(this);
    }

    toString() {
        return this.buffer.join('');
    }
}
function first() {
    let simple = new AdditionExpression(
        new Integer(2), new Integer(3)
    );
    let ep = new ExpressionPrinter();
    ep.visitAddition(simple);
    console.log(ep.toString());
}
first();

function second() {
    let simple = new MultiplicationExpression(
        new Integer(2), new Integer(3)
    );
    let ep = new ExpressionPrinter();
    ep.visitMultiplication(simple);
    console.log(ep.toString());
}

second();
