const Word = require('./word.js')
const prompt = require('prompt');
const wordSet = process.argv[2];
const colorWords = require('./colors.js');
let wordsInPlay = [];

function setupGame(){
    const thisGameArray = colorWords[wordSet];
    while(wordsInPlay.length < thisGameArray.length){
        const index = Math.floor(Math.random() * thisGameArray.length);
        if(!wordsInPlay.includes(thisGameArray[index])) wordsInPlay.push(thisGameArray[index]);
    }
}
function getUserGuess(word, guessObject, wrongs){
    word.updateWordDisplay();
    prompt.start();
    return new Promise(function(resolve) {
        prompt.get(guessObject, (err, result) => {
            if(err) throw err;
            const letterGuessed = result.guess.toLowerCase();
            let userGuess;
            if (word.wordObject.hasOwnProperty(letterGuessed) && word.wordObject[letterGuessed].guessed === false) {
                userGuess = true;
                word.wordObject[letterGuessed].guessed = true;
                word.wordObject[letterGuessed].changeDisplay();
            }
            else {
                userGuess = false;
                wrongs--;
            }
            resolve({gussedRight: userGuess, letter: letterGuessed, wrongs: wrongs});
        });
    });
}
function gameFeedback(guessed, letter, wrongs){
    console.log('=================/YOUR LAST GUESS/===================');
    if(guessed){
        console.log(`${letter}: correct\n`)
        console.log('Great guess!\n')
    }
    else {
        console.log(`${letter}: wrong`)
        console.log('Better luck next time!\n')
    }
    console.log(`Wrong guesses left: ${wrongs}\n`);
}
function wordGuess() {
    let wrongsLeft = 5;
    let losses = 4;
    if(wordSet === undefined || wordSet === 0) throw 'You must enter one of the word categories to play: classic, fruit, earth, precious, animals, food, trees, or flowers';
    setupGame();
    if(losses > 0){
        let wordThisRound;
        let guessObject = {
            name: 'guess',
            description: 'Enter your letter guess',
            type: 'string',
            pattern: /^[a-zA-z]$/,
            message: 'Your guess must only include a single letter.',
            required: true
        };
        for(i = 0; i < wordsInPlay.length; i++){
            console.log(`This round's word is ${wordsInPlay[i]}.`);
            wordThisRound = new Word(wordsInPlay[i]);
            wordThisRound.setupWord();
            do {
                getUserGuess(wordThisRound, guessObject, wrongsLeft).then(function(promise){
                    wrongsLeft = promise.wrongs;
                    gameFeedback(promise.gussedRight, promise.letter, wrongsLeft);
                });
            } while (wrongsLeft > 0);
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