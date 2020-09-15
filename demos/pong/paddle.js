import * as utils from './utils.js';

export default function Paddle(gameHandle, x, y, w, h, s){
  var leftControl = document.getElementById("ucontrol1");
  var rightControl = document.getElementById("ucontrol2");
  
  var dir = -1;
  var speed = s;
  var threshold = 4;
  
  this.userDir = 0;
  this.width = w;
  this.height = h;
  this.position = { x: x, y: y };
  
  this.setSpeed = function(spd){
    speed = spd;
  }
  
  this.calculateNewAngle = function(){
    let paddleCentre = this.position.y + (this.height / 2);
    let distanceFromCentre = paddleCentre - gameHandle.ball.position.x;
    
    let normalizeIntersect = distanceFromCentre / (this.height / 2);
    let newBounceAngle = normalizeIntersect * (5 * Math.PI / 12);
    
    gameHandle.ball.direction.x = -Math.sin(newBounceAngle);
    gameHandle.ball.direction.y = -Math.cos(newBounceAngle);
  }
  
  this.draw = function(ctx){
    ctx.beginPath();
    ctx.rect(this.position.x, this.position.y, this.width, this.height);
    ctx.fillStyle = "black";
    ctx.fill();
    ctx.closePath();
  }
  
  this.update = function(dt){  
    /* SETTING THE DIRECTION */
    
    /*if ball is within inner 6/8ths of game area, move paddle according to ball destination. 
      otherwise, if ball is within 1/8 of game area closest to the paddle, 
      move paddle based on ball's y coord.*/
    if(gameHandle.ball.position.x > (gameHandle.gWIDTH / 8) && gameHandle.ball.position.x < (gameHandle.gWIDTH - gameHandle.gWIDTH / 8)){
      //if ball trajectory position is higher on the y axis, move paddle in that direction
      if(gameHandle.ball.trajectory.y >= (this.position.y + this.height / 2))
        dir = 1;
      //else move in neg direction (up)
      else if(gameHandle.ball.trajectory.y <= (this.position.y + this.height / 2))
        dir = -1;
    }
    else{
      //set paddle direction toward ball's y's center
      if(gameHandle.ball.position.y >= (this.position.y + this.height / 2))
        dir = 1;
      else if(gameHandle.ball.position.y <= (this.position.y + this.height / 2))
        dir = -1;
    }
    
    
    /* MOVING THE PADDLE */
    
    //if the paddle is on the right
    if(this.position.x > gameHandle.gWIDTH / 2){
      //if the ball is within the right paddle's "visibility" threshold, and user has not selected to control the paddle
      if(gameHandle.ball.position.x > (gameHandle.gWIDTH / threshold) && rightControl.checked == false){
        //modify actual y position by direction times speed
        this.position.y += dir * speed;
        //dir = 0;
      }
      //otherwise just move paddle based on user input direction
      else
        this.position.y += this.userDir * speed;
    }
    else{
      //paddle is on the left
      if(gameHandle.ball.position.x < (gameHandle.gWIDTH - gameHandle.gWIDTH / threshold) && leftControl.checked == false){
        //modify actual y position by direction times speed
        this.position.y += dir * speed;
        //dir = 0;
      }
      //otherwise just move paddle based on user input direction
      else
        this.position.y += this.userDir * speed;
    }
    
    //prevent the paddle from going off the screen
    if(this.position.y < 0)
      this.position.y = 0;
    else if(this.position.y + this.height > gameHandle.gHEIGHT)
      this.position.y = gameHandle.gHEIGHT - this.height;
    
    /* RESOLVE COLLISIONS WITH BALL */
    
    //check if paddle is colliding with ball
    if(utils.isCollision(gameHandle.ball, this)){
      //narrow down which area of the paddle the ball has hit so as not to trigger multiple redirections
      
      //bottom
      if(gameHandle.ball.position.y > this.position.y + this.height 
        && gameHandle.ball.position.y - gameHandle.ball.radius < this.position.y + this.height 
        && gameHandle.ball.position.x < this.position.x + this.width 
        && gameHandle.ball.position.x > this.position.x 
        && Math.sign(gameHandle.ball.direction.y) == -1)
      {
        gameHandle.ball.direction.y = -gameHandle.ball.direction.y;
      }
      //top
      else if(gameHandle.ball.position.y < this.position.y 
        && gameHandle.ball.position.y + gameHandle.ball.radius > this.position.y 
        && gameHandle.ball.position.x < this.position.x + this.width 
        && gameHandle.ball.position.x > this.position.x 
        && Math.sign(gameHandle.ball.direction.y) == 1)
      {
        gameHandle.ball.direction.y = -gameHandle.ball.direction.y;
      }
      //right (on left paddle)
      else if(gameHandle.ball.position.x - gameHandle.ball.radius < this.position.x + this.width 
        && gameHandle.ball.position.x > this.position.x
        && gameHandle.ball.position.x < gameHandle.gWIDTH / 2)
      {
        //only switch ball x direction if ball is moving to the left
        if(Math.sign(gameHandle.ball.direction.x) == -1){
          gameHandle.ball.direction.x = -gameHandle.ball.direction.x;
        }
      }
      //left (on right paddle)
      else if(gameHandle.ball.position.x + gameHandle.ball.radius > this.position.x 
        && gameHandle.ball.position.x + gameHandle.ball.radius < this.position.x + this.width
        && gameHandle.ball.position.y > this.position.y 
        && gameHandle.ball.position.y < this.position.y + this.height 
        && gameHandle.ball.position.x > gameHandle.gWIDTH / 2)
      {
        //only switch ball x direction if ball is moving to the right
        if(Math.sign(gameHandle.ball.direction.x) == 1){
          gameHandle.ball.direction.x = -gameHandle.ball.direction.x;
        }
      }
      
      //every time collisions are resolved, recalculate ball's destination trajectory
      gameHandle.ball.calculateTrajectory();
    }
  }
}
