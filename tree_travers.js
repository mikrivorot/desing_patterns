// Iterator - an object to facilitate the traversal of a data structure

class Node {
    constructor(value, left = null, right = null) {
        this.value = value;
        this.left = left;
        this.right = right;
        this.parent = null;

        if (this.left)
            left.parent = this;
        if (this.right)
            right.parent = this;
    }

    * preorder() {
        yield this.value;
        if (this.left) {
            for (let valueInLeft of this.left.preorder()) {
                yield valueInLeft;
            }
        }
        if (this.right) {
            for (let valueInRight of this.right.preorder()) {
                yield valueInRight;
            }
        }
    }
}

//     1
//    / \
//   2   3
//  / \ / \
// 4   56   7

// preorder:  1245367

let root = new Node(1, new Node(2, new Node(4), new Node(5)), new Node(3, new Node(6), new Node(7)));
for (let value of root.preorder()) {
    console.log(value);
}
