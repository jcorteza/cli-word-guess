const colorWords = require('./colors.js');
const Word = require('./word.js')
const prompt = require('prompt');
const wordSet = process.argv[2];

function wordGuess() {
    let wordsInPlay = [];
    let wrongsLeft = 5;
    let losses = 3;
    let won;
    let guessObject = {
        name: 'guess',
        description: 'Enter your letter guess',
        type: 'string',
        pattern: /^[a-zA-z]$/,
        message: 'Your guess must only include a single letter.',
        required: true
    };
    if(wordSet === undefined || wordSet === 0) throw 'You must enter one of the word categories to play: classic, fruit, earth, precious, animals, food, trees, or flowers';
    setupGame(wordsInPlay);
    prompt.start();
    wordsInPlay.forEach((word) =>{
        let solved = false;
        if(losses > 0){
            console.log(`This round's word is ${word}.`);
            const wordThisRound = new Word(word);
            wordThisRound.setupWord();
            do {
                wordThisRound.updateWordDisplay();
                new Promise(function(resolve) {
                    prompt.get(guessObject, (err, result) => {
                        if(err) throw err;
                        let userGuess;
                        const letterGuessed = result.guess.toLowerCase();
                        if (wordThisRound.wordObject.hasOwnProperty(letterGuessed) && wordThisRound.wordObject[letterGuessed].guessed === false) {
                            userGuess = true;
                            wordThisRound.wordObject[letterGuessed].guessed = true;
                            wordThisRound.wordObject[letterGuessed].changeDisplay();
                        }
                        else {
                            userGuess = false;
                            wrongsLeft--;
                        }
                        resolve({gussedRight: userGuess, letter: letterGuessed});
                    });
                }).then(function(promise){
                    gameFeedback(promise.gussedRight, promise.letter);
                });
                --wrongsLeft;
                for(let key in wordThisRound.wordObject){
                    if(wordThisRound.wordObject[key].guessed === true) solved = true;
                    else {
                        solved = false; 
                        return;
                    }
                }
            } while(wrongsLeft > 0 || solved !== true);
            if(wrongsLeft === 0) losses--;
        }
    });
    console.log('Reached the end of the words.');
    let message;
    (won)? message = '====================/YOU WON=========================' : message = '====================/YOU LOST========================'
    console.log('\n=====================================================');
    console.log('====================/GAME OVER/======================');
    console.log('=====================================================');
    console.log(message);
    console.log('=====================================================');
}
function setupGame(array){
    const thisGameArray = colorWords[wordSet];
    while(array.length < thisGameArray.length){
        const index = Math.floor(Math.random() * thisGameArray.length);
        if(!array.includes(thisGameArray[index])) array.push(thisGameArray[index]);
    }
}
function gameFeedback(guessed, letter){
    console.log('\n=================/YOUR LAST GUESS/===================');
    if(guessed){
        console.log(`${letter}: correct\n`)
        console.log('Great guess!\n')
    }
    else {
        console.log(`${letter}: wrong`)
        console.log('Better luck next time!\n')
    }
    console.log(`Wrong guesses left: ${wrongsLeft}\n`);
}
wordGuess();