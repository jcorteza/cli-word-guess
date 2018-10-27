const Letter = require('./letter.js');
let Word = function(word){
    this.wordAnswer = word.split('');
    this.wordDisplay = [];
    this.wordObject = {};
    // this.printWord = () => console.log(this.array);
    this.setupWord = function() {
        this.wordAnswer.forEach((char) => {
            const thisLetter = new Letter(char);
            this.wordDisplay.push(thisLetter.display);
            this.wordObject[char] = thisLetter;
        });
        // console.log(this.wordDisplay.join(' '));
    }
}
module.exports = Word;
