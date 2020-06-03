//paddle class
export default function Paddle(gameWorld, w, h, speed){
  var canvasDimensions = gameWorld.getScreenDimensions();
  
  this.position = { x: (canvasDimensions.width - 75) / 2, y: canvasDimensions.height - (10 * 5) };
  this.w = w;
  this.h = h;
  this.speed = speed;
  this.rightPressed = false;
  this.leftPressed = false;
  
  this.draw = function(context){
    context.beginPath();
    context.rect(this.position.x, this.position.y, this.w, this.h);
    context.fillStyle = "black";
    context.fill();
    context.closePath();
  }
  
  this.update = function(dt){
    this.input(dt);
  }
  
  //PADDLE MOVEMENT/CHECKING
  this.input = function(dt){
    if(this.rightPressed){
      this.position.x += dt * this.speed;
      if(this.position.x + this.w > canvasDimensions.width)
        this.position.x = canvasDimensions.width - this.w;
    }
    else if(this.leftPressed){
      this.position.x -= dt * this.speed;
      if(this.position.x < 0)
        this.position.x = 0;
    }
  }
}
