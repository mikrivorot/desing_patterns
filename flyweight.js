// Save text settings separately from code
// Can be applied for any entities and any rules/settings

class Sentence {
    constructor(plainText) {
        this.plainText = plainText;
        this.positions = [];
    }

    at(index) {
        const position = new TextPosition(index);
        this.positions.push(position);
        return position;
    }

    toString() {
        {
            let buffer = [];
            const textAsArrayOfWords = this.plainText.split(' ');
            for (let i in textAsArrayOfWords) {
                let word = textAsArrayOfWords[i];
                for (let range of this.positions) {
                    if (range.covers(i) && range.capitalize)
                        word = word.toUpperCase();
                }
                buffer.push(c);
                if (i < textAsArrayOfWords.length - 1) {
                    buffer.push(' ')
                }
            }
            return buffer.join('');
        }
    }
}

class TextPosition {
    constructor(position) {
        this.position = position;
        this.capitalize = false; // abd any other settings per entity (e.g. here entity is a word)
    }

    covers(position) {
        return this.position == position;
    }
}


let s = new Sentence('alpha beta gamma');
s.at(1).capitalize = true;
console.log(s.toString()); // alpha BETA gamma
