//import utils from './utilities.js';
import * as utils from './utilities.js';

//ball class
export default function Ball(gameWorld, x, y, r, speed){
  var canvasDimensions = { 
    w: gameWorld.getScreenDimensions().width, 
    h: gameWorld.getScreenDimensions().height 
  };
  
  this.position = { x, y };
  this.radius = r;
  this.speed = speed;
  this.direction = { x : 0.1, y : -0.1 };
  this.attached = true;
  this.deleted = false;
  
  this.color = 'black';
  
  this.draw = function(context){
    context.beginPath();
    context.arc(this.position.x, this.position.y, this.radius, 0, Math.PI*2, false);
    context.fillStyle = this.color;
    context.fill();
    context.lineWidth = 3;
    context.stokeStyle = "black"
    context.stroke();
    context.lineWidth = 1;
    context.closePath();
  }
  this.update = function(dt){
    if(this.attached === true){
      this.position.x = gameWorld.paddle.position.x + (gameWorld.paddle.w / 2);
      this.position.y = gameWorld.paddle.position.y - this.radius;
    }
    else{
      //update position
      this.position.x += this.direction.x * dt * this.speed;
      this.position.y += this.direction.y * dt * this.speed;
    
      //update boundaries
      this.checkBoundaries(dt);
    }
  }
  
  this.checkBoundaries = function(dt){
    
    var pad = gameWorld.paddle;
    
    //check left boundary
    if(this.position.x + this.direction.x < this.radius){
      this.direction.x = -this.direction.x;
      this.color = utils.randomizeColor();
      
      //avoid getting stuck in wall
      this.position.x = this.radius;
    }
    //check right boundary
    if(this.position.x + this.direction.x > canvasDimensions.w - this.radius){
      this.direction.x = -this.direction.x;
      this.color = utils.randomizeColor();
      
      //avoid getting stuck in wall
      this.position.x = canvasDimensions.w - this.radius;
    }
    //check top boundary
    if(this.position.y + this.direction.y < this.radius){
      this.direction.y = -this.direction.y;
      this.color = utils.randomizeColor();
    }
    if(this.position.y + this.direction.y > canvasDimensions.h - this.radius && gameWorld.balls.length === 1){
      //show button, set text to game over and disable link
      document.getElementById("resButton").style.display = "block";
      document.getElementById("gameOver").style.display = "block";
      document.getElementById("title").style.pointerEvents = "none"; 
      document.getElementById("title").style.display = "none"; 
      this.speed = 0;
      
      gameWorld.inputHandler.disable();
      gameWorld.gameOver = true;
    }
    else if(this.position.y + this.direction.y > canvasDimensions.h + this.radius && gameWorld.balls.length > 1){
      this.deleted = true;
    }

    //check ball collision with paddle
    if(utils.areColliding(this, pad)){
      //calculateNewAngle relative to middle of paddle + get random ball color
      this.calculateNewAngle(pad);
      this.color = utils.randomizeColor();
      
      //load new headline and resize it
      gameWorld.headlines.updateHeadline('title');
      utils.adjustFontSize('title');
    }
  }
  
  this.calculateStartAngle = function(){
    var newBounceAngle = utils.getRndFloat(-1, 1) * (5 * Math.PI / 12);
    this.direction.x = Math.sin(newBounceAngle);
    this.direction.y = -Math.cos(newBounceAngle);
    this.direction.x = -this.direction.x;
  }
  
  this.calculateNewAngle = function(pad){
    var paddleCenter = pad.position.x + (pad.w / 2);
    var distanceFromCenter = paddleCenter - this.position.x;
    //var distanceFromCenter = (pad.position.x + (pad.w / 2)) - (this.position.x);
  
    var normalizeIntersect = distanceFromCenter / (pad.w / 2);
    var newBounceAngle = normalizeIntersect * (5 * Math.PI / 17 );
    
    this.direction.x = Math.sin(newBounceAngle);
    this.direction.y = -Math.cos(newBounceAngle);
    this.direction.x = -this.direction.x;
  }
}
