const Letter = function(char){
    this.guessed = false;
    this.display = '_';
    this.right = char;
}
Letter.prototype.changeDisplay = function(){
    if(this.guessed) this.display = this.right;
}

module.exports = Letter;