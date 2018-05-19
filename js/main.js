//can use the following window onload 
//hack with html img tag to load images
//the way I used it hear
window.onload = function () {
    const c = document.getElementById('canvas');

    //avoid sizing canvas with css. Use javascript.
    c.width = window.innerWidth;
    c.height = 600;

    //object interface that has methods for communicating between canvas and graphic card
    const ctx = c.getContext('2d');

    const environment = new Environment(c, ctx);
    const bird = new Bird(250, 300, ctx);
    const pipes = [];

    setInterval(function () {
        let pipeSet = generateRandomPipes(ctx, c.width, c.height);
        pipes.push(pipeSet.top, pipeSet.bottom);
    }, 3000);

    gameLoop();

    /*
       Main Game Loop
    */
    function gameLoop() {
        ctx.fillRect(0, 0, c.width, c.height);
        environment.update();
        environment.render();
        pipes.forEach(function (pipe1) {
            pipe1.update();
            pipe1.render();
        });

        bird.update();
        bird.render();
        if (detectCollisions(bird, pipes)) {
            alert("You Lose!");
            window.location = '/';
        }
        window.requestAnimationFrame(gameLoop);
    }
};

function generateRandomPipes(ctx, canvasWidth, canvasHeight) {
    let lengthTop = Math.round(Math.random() * 200 + 50);
    let lengthBottom = canvasHeight - 300 - lengthTop;
    let returnVal = { };
    returnVal.top = new Pipe(canvasWidth, -5, lengthTop, 4, ctx);
    returnVal.bottom = new Pipe(canvasWidth, canvasHeight + 5 - lengthBottom, lengthBottom, 4, ctx);
    return returnVal;
}

function detectCollisions(bird, pipes) {
    for (var i = 0; i < pipes.length; i++) {
        let e = pipes[i]
        let highPipe = e.ypos <= 0;
        let x0 = e.xpos, x1 = e.xpos + e.width;
        if (highPipe) {
            let y0 = e.ypos + e.length;
            let alpha = bird.x;
            let beta = bird.y - bird.height / 2;
            if (alpha > x0 && alpha < x1 && beta < y0) {
                return true;
            }
        }
        else {
            let y2 = e.ypos;
            let a = bird.x;
            let b = bird.y + bird.height / 2;
            if (a > x0 && a < x1 && b > y2) return true;
        }
    };
    return false;
}

//x, y, w, h
// ctx.fillRect(20, 20, 20, 20);
// ctx.fillStyle = "#9900cc";
// ctx.fillRect(100, 20, 20, 20);
// ctx.fillStyle = "#00ff00";
// ctx.fillRect(200, 20, 20, 20);


// ctx.strokeRect(300, 20, 20, 20);
// ctx.strokeStyle = "#ff000";
// ctx.strokeRect(400, 20, 20, 20);

//can load the image after you put everything inside
//window onlaod event by using the followung line of code
//ctx.drawImage(document.getElementById('bird1'), 500, 20);

//if you do not use window onload event hack to
//show images and use the real way then
//need to have server running for this to show.
//loading is asynchronous so the next line won't work.
// const bird1 = new Image();
// bird1.src = '../images/bird1.png';
// need all of the following for image to load first
// then use a callback function to draw it.
// ctx.drawImage(bird1, 500, 20);
// };

