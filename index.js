const Word = require('./word.js')
const prompt = require('prompt');
const wordSet = process.argv[2];
const colorWords = {
    classic: ['red', 'blue', 'yellow', 'orange', 'green', 'purple', 'brown', 'black', 'white', 'grey'],
    fruit: ['apricot', 'bayberry', 'citron', 'mulberry', 'persimmon', 'peach', 'prune', 'raspberry', 'strawberry', 'tangerine'],
    earth: ['ashes', 'charcoal', 'dusk', 'flame', 'ivory', 'slate', 'sand', 'smoke', 'copper', 'pewter'],
    precious: ['amethyst', 'amber', 'celadon', 'garnet', 'pearl', 'ruby', 'topaz', 'turquoise', 'gold', 'graphite'],
    animals: ['beaver', 'cardinal', 'camel', 'chamois', 'fawn', 'mouse', 'salmon', 'mole'],
    food: ['biscuit', 'chocolate', 'eggshell', 'mustard', 'eggplant', 'maize', 'chili', 'oatmeal', 'olive', 'wheat'],
    trees: ['bamboo', 'cedar', 'evergreen', 'ebony', 'laurel', 'maple', 'teak', 'sandalwood', 'spruce'],
    flowers: ['dandelion', 'forsythia', 'heather', 'jonquil', 'lavender', 'marigold', 'orchid', 'sunflower', 'tearose', 'wistaria']
}
let wordsInPlay = [];

function setupRound(){
    const thisRoundArray = colorWords[wordSet];
    while(wordsInPlay.length < thisRoundArray.length){
        const index = Math.floor(Math.random() * thisRoundArray.length);
        if(!wordsInPlay.includes(thisRoundArray[index])) wordsInPlay.push(thisRoundArray[index]);
    }
    // console.log(wordsInPlay);
}
// function updateDisplay(letterGuess, wordObject){
//     if(wordObject.wordAnswer.includes(letterGuess)) wordObject.
// }
function wordGuess() {
    let wrongChoice = 0;
    if(wordSet === undefined || wordSet === 0) console.log('You must enter one of the word categories to play: classic, fruit, earth, precious, animals, food, trees, or flowers')
    else if(wrongChoice < 5){
        let wordThisRound;
        let guess = {
            name: 'guess',
            description: 'Enter your letter guess',
            type: 'string',
            pattern: /[a-z]/i,
            message: 'Your guess must only include letters.',
            required: true
        };
        setupRound();
        for(i = 0; i < wordsInPlay.length; i++){
            wordThisRound = new Word(wordsInPlay[i]);
            wordThisRound.setupWord();
            prompt.start();
            prompt.get(guess, (err, result) => {
                if(err) throw err;
                console.log(result.guess);
            //     updateDisplay(result, wordThisRound);
            });
            return;
        }
        /*wordsInPlay.forEach((colorWord) =>{
            wordThisRound = new Word(colorWord);
            wordThisRound.setupWord();
            prompt.start();
            prompt.get(guess, (err, result) => {
                if(err) throw err;
                console.log(result);
            //     updateDisplay(result, wordThisRound);
            });
        });*/
    }
    else {
        console.log('Game Over');
    }

}
wordGuess();
/*
Word {
  wordAnswer: [ 'b', 'l', 'u', 'e' ],  wordDisplay: [ '_', '_', '_', '_' ],
  wordObject:   { b: Letter { guessed: false, display: '_', right: 'b' },
     l: Letter { guessed: false, display: '_', right: 'l' },
     u: Letter { guessed: false, display: '_', right: 'u' },
     e: Letter { guessed: false, display: '_', right: 'e' } },
  setupWord: [Function] }
  */