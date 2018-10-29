const Letter = require('./letter.js');
let Word = function(word){
    this.wordAnswer = word.split('');
    // this.wordDisplay = [];
    this.wordObject = {};
    this.setupWord = function() {
        this.wordDisplay = this.wordAnswer.map((char) => {
            const thisLetter = new Letter(char);
            this.wordObject[char] = thisLetter;
            return thisLetter.display;
            // this.wordDisplay.push(thisLetter.display);
        });
        // this.wordAnswer.forEach((char) => {
        //     const thisLetter = new Letter(char);
        //     this.wordDisplay.push(thisLetter.display);
        //     this.wordObject[char] = thisLetter;
        // });
    }
    this.updateWordDisplay = function() {
        this.wordDisplay = this.wordAnswer.map((char) => {
            console.log(this.wordObject[char].display);
            return this.wordObject[char].display;
            // this.wordDisplay.push(this.wordObject[char].display);
        });
        // this.wordAnswer.forEach((char) => {
        //     console.log(this.wordObject[char].display);
        //     this.wordDisplay.push(this.wordObject[char].display);
        // });
        console.log(`new wordDisplay array is ${this.wordDisplay}`)
        console.log('\n=================/WORD GUESS-COLORS/===================');
        console.log('Take your guess!!!\n');
        console.log(`${this.wordDisplay.join(' ')}\n`);
    }
}
module.exports = Word;
