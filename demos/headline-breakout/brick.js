import * as utils from './utilities.js';
import PowerUP from './powerup.js';

export default function Brick(columns, position, gameWorld, powerUp, inv, hp, col){
  var gameWidth = gameWorld.getScreenDimensions().width;
  var gameHeight = gameWorld.getScreenDimensions().height;
  
  this.position = {
    x: position.x,
    y: position.y
  }
  
  this.w = gameWidth / columns;
  this.h = 30;
  
  this.color = col;
  
  this.deleted = false;
  this.special = powerUp;
  this.invincible = inv;
  this.health = hp;
  
  this.update = function(dt){
    for(let i = 0; i < gameWorld.balls.length; i++){
      if(utils.areColliding(gameWorld.balls[i], this)){
        if(this.invincible === false){
          this.health -= 1;
          if(this.health === 2)
            this.color = '#79BAEC';
          if(this.health === 1)
            this.color = '#ADDFFF';
        }
        
        if(this.invincible === false && this.health < 1){
          gameWorld.score += 10;
          this.deleted = true;
        }
        
        if(this.special === true){
          //if new brick is special, it's a powerup brick:
            //create it in world so it can be updated
          gameWorld.addObject(new PowerUP(
            this.position.x + this.w / 2, 
            this.position.y + this.h / 2, 
            50, 
            gameWorld
          ));
        }
        
        //reverse directions
        if(gameWorld.balls[i].position.x > this.position.x + this.w){
          //right side collision
          gameWorld.balls[i].direction.x = -gameWorld.balls[i].direction.x;
          gameWorld.balls[i].position.x = this.position.x + this.w + gameWorld.balls[i].radius;
        }
        else if(gameWorld.balls[i].position.x < this.position.x){
          //left side collision
          gameWorld.balls[i].direction.x = -gameWorld.balls[i].direction.x;
          gameWorld.balls[i].position.x = this.position.x - gameWorld.balls[i].radius;
        }
        else if(gameWorld.balls[i].position.y < this.position.y){
          //top collision
          gameWorld.balls[i].direction.y = -gameWorld.balls[i].direction.y;
          gameWorld.balls[i].position.y = this.position.y - gameWorld.balls[i].radius;
        }
        else if(gameWorld.balls[i].position.y > this.position.y + this.h){
          //bottom collision
          gameWorld.balls[i].direction.y = -gameWorld.balls[i].direction.y;
          gameWorld.balls[i].position.y = this.position.y + this.h + gameWorld.balls[i].radius;
        }
      }
    }
    if(this.special === true){
      this.color = utils.randomizeColor();
    }    
  }
  
  this.draw = function(context){
    context.beginPath();
    context.rect(this.position.x, this.position.y, this.w, this.h);
    context.fillStyle = this.color;
    context.fill();
    context.strokeStyle = "black";
    context.stroke();
    context.closePath();
  }
}
