const Pipe = function(xpos, ypos, length, speed, ctx, pipe){
    this.ypos = ypos;
    this.xpos = xpos;
    this.length = length;
    this.ctx = ctx;
    this.speed = speed;
    this.width = 104;
    this.passed = false;
    this.pipe = pipe;
}

  
Pipe.prototype.update = function(){
    this.xpos -= this.speed;
}

//context.drawImage(image, sx, sy, sw, sh, dx, dy, dw, dh)
//context.drawImage(image, dx, dy, dw, dh)
//context.drawImage(image, dx, dy)
Pipe.prototype.render = function(){
    this.ctx.save();
    this.ctx.drawImage(this.pipe, this.xpos, this.ypos, this.width, this.length);
    this.ctx.restore();
    
}