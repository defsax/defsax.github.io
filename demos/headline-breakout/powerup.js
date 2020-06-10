import * as utils from './utilities.js';
import Ball from './ball.js';

export default function PowerUP(x, y, s, gameWorld){
  var speed = s;
  var color;
  var canvasHeight = gameWorld.getScreenDimensions().height;
  var duration = 0;
  
  var activate = function(dt){
    duration += dt;
    console.log("Duration: " + duration);
    
    if(duration >= 1)
      this.deleted = true;
  }
  
  var shortPad = {
    start: function(){
      console.log("Short paddle.");
      gameWorld.message = "Short Paddle";
      gameWorld.paddle.w = 40;
      gameWorld.duration = 7.5; //7.5 seconds
    },
    stop: function(){
      gameWorld.message = " ";
      console.log("Stopping short paddle.");
      gameWorld.paddle.w = gameWorld.paddleWidth;
    }
  };
  
  var longPad = {
    start: function(){
      console.log("Long paddle.");
      gameWorld.message = "Long Paddle";
      gameWorld.paddle.w = 150;
      gameWorld.duration = 10; //10 seconds
    },
    stop: function(){
      gameWorld.message = " ";
      console.log("Stopping long paddle.");
      gameWorld.paddle.w = gameWorld.paddleWidth;
    }
  };
  
  var slowBall = {
    start: function(){
      console.log("Slowball.");
      gameWorld.message = "Slo-mo";
      for(let i = 0; i < gameWorld.balls.length; i++)
        gameWorld.balls[i].speed = 100;
      
      gameWorld.duration = 10; //10 seconds
    },
    stop: function(){
      gameWorld.message = " ";
      console.log("Stopping slowball.");
      for(let i = 0; i < gameWorld.balls.length; i++)
        gameWorld.balls[i].speed = gameWorld.ballSpeed;
    }
  };
  
  var fastBall = {
    start: function(){
      gameWorld.message = "Fastball";
      console.log("Fastball.");
      for(let i = 0; i < gameWorld.balls.length; i++)
        gameWorld.balls[i].speed = 400;
      
      gameWorld.duration = 5; //5 seconds
    },
    stop: function(){
      gameWorld.message = " ";
      console.log("Stopping fastball.");
      for(let i = 0; i < gameWorld.balls.length; i++)
        gameWorld.balls[i].speed = gameWorld.ballSpeed;
    }
  };
  var multiBall = {
    start: function(){
      gameWorld.message = "Multiball";
      console.log("Multiball.");
      
      var newBall = new Ball(gameWorld, gameWorld.paddle.position.x + gameWorld.paddle.w / 2, gameWorld.paddle.position.y - 10, 10, gameWorld.ballSpeed);
      newBall.color = utils.randomizeColor();
      newBall.attached = false;
      newBall.calculateStartAngle();
      newBall.deleted = false;
      
      gameWorld.balls.push(newBall); //register with ball array
      gameWorld.duration = 0.1 //reset powerup timer right away
    },
    stop: function(){
      gameWorld.message = " ";
      gameWorld.duration = 10;
      return;
    }
  };
  
  var randomPowerUp = function(){
    var x = Math.floor(Math.random() * 5);
    switch(x){
      case 0:
        return shortPad;
      case 1:
        return longPad;
      case 2:
        return slowBall;
      case 3:
        return fastBall;
      case 4:
        return multiBall;
    }
  };
  
  this.w = 10;
  this.h = 10;
  
  this.position = { x: x, y: y };
  this.direction = { x: 0, y: 1 };
  this.deleted = false;
  this.draw = true;
  
  this.update = function(dt){
    color = utils.randomizeColor();
    this.position.y += this.direction.y * dt * speed;
    
    //if you catch the powerup, push a random powerup to gameWorld array
    if(utils.rectCollision(this, gameWorld.paddle)){
      console.log("Caught powerup.");
      //gameWorld.addPowerUp(randomPowerUp());
      gameWorld.setPowerUp(randomPowerUp());
      this.deleted = true;
    }
    
    if(this.position.y > canvasHeight){
      console.log("Missed powerup.");
      this.deleted = true;
    }
  }
  this.draw = function(context){
    context.beginPath();
    context.rect(this.position.x, this.position.y, this.w, this.h);
    context.fillStyle = color;
    context.fill();
    context.strokeStyle = "black";
    context.stroke();
    context.closePath();
  }
}
