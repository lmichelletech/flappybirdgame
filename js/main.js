//can use the following window onload 
//hack with html img tag to load images
//the way I used it hear
window.onload = function () {
    const c = document.getElementById('canvas');
    newgame = document.getElementById('newgame');

    //avoid sizing canvas with css. Use javascript.
    c.width = window.innerWidth;
    c.height = 600;

    //object interface that has methods for communicating between canvas and graphic card
    const ctx = c.getContext('2d');

    const environment = new Environment(c, ctx);
    const bird = new Bird(250, 300, ctx);
    const pipes = [];
    let pipeSet = generateRandomPipes(ctx, c.width, c.height);
    pipes.push(pipeSet.top, pipeSet.bottom);
    setInterval(function () {
        let pipeSet = generateRandomPipes(ctx, c.width, c.height);
        pipes.push(pipeSet.top, pipeSet.bottom);
    }, 2600);

    const score = new Score(bird, pipes, c, ctx);

    gameLoop();

    /*
       Main Game Loop
    */
    function gameLoop() {
        bird.update(pipes);

        if (!bird.dead) {
            environment.update();
            
            pipes.forEach(function(pipe1){
                pipe1.update();
            });
        }

        environment.render();
        pipes.forEach(function(pipe1){
            pipe1.render();
        });
        bird.render();
        if (bird.dead){
            drawGameOver(ctx, c);
            newgame.style.display = 'inline';
        }  
        
        window.requestAnimationFrame(gameLoop);
    }
};

function generateRandomPipes(ctx, canvasWidth, canvasHeight) {
    let lengthTop = Math.round(Math.random() * 200 + 50);
    let lengthBottom = canvasHeight - 200 - lengthTop;
    let returnVal = { };
    returnVal.top = new Pipe(canvasWidth, -5, lengthTop, 4, ctx);
    returnVal.bottom = new Pipe(canvasWidth, canvasHeight + 5 - lengthBottom, lengthBottom, 4, ctx);
    return returnVal;
}

function drawGameOver(ctx, c) {
    ctx.font = "30px Verdana";
    ctx.textAlign = "center";
    ctx.fillText("Game Over!!", c.width / 2, c.height / 2);
}

function newGame(){
    window.location.reload();
}

