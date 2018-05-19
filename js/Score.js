const Score = function (bird, pipes, c, ctx) {
    this.scored = false;
    this.score = 0;
    this.bird = bird;
    this.pipes = pipes;
    this.c = c;
    this.ctx = ctx;
}

Score.prototype.update = function (pipes) {
    if(this.passedPipe(pipes)){
        this.scored = true;
    }
    
}

Score.prototype.passedPipe = function(pipes) {
this.pipes.forEach(pipe => {
        //bird passed pipe
        if (this.bird.x > pipe.xpos + pipe.width) {
            console.log('Passed Pipe');
        }
    })
}