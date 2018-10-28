const Letter = function(char){
    this.guessed = false;
    this.display = '_';
    this.right = char;
}
Letter.prototype.changeDisplay = function(){
    if(this.guessed) this.display = this.right;
    console.log(`Display letter is now ${this.display}`);
}

module.exports = Letter;