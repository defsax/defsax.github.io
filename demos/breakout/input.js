import * as utils from './utilities.js';

export default function InputHandler(gameWorld){
  
  this.initialize = function(){
    //input event listeners
    
    //KEY LISTENERS
    document.addEventListener("keydown", keyDownHandler, false);
    document.addEventListener("keyup", keyUpHandler, false);
    
    //TOUCH LISTENERS
    document.addEventListener("touchstart", touchStartHandler, false);
    document.addEventListener("touchmove", touchMoveHandler, { passive: false });
    document.addEventListener("touchend", touchEndHandler, false);
    
    //BUTTON LISTENERS
    document.getElementById("resButton").addEventListener("click", utils.reset);
    
    console.log("Listeners enabled.");
  }
  
  this.disable = function(){
    document.removeEventListener("keydown", keyDownHandler, false);
    document.removeEventListener("keyup", keyDownHandler, false);
    
    document.removeEventListener("touchstart", touchStartHandler, false);
    document.removeEventListener("touchmove", touchMoveHandler, false);
    document.removeEventListener("touchend", touchEndHandler, false);
    //reset function is attached to the button. loop technically continues until user presses restart
    
    console.log("Listeners disabled.");
  }
  
  //INPUT CONTROLS
  
  //KEYBOARD CONTROLS
  var keyDownHandler = function(e){
    if(e.key == "Right" || e.key == "ArrowRight")
      gameWorld.paddle.rightPressed = true;
    else if(e.key == "Left" || e.key == "ArrowLeft")
      gameWorld.paddle.leftPressed = true;
    else if(e.keyCode == 32 && gameWorld.ball.attached === true){
      gameWorld.ball.calculateStartAngle();
      gameWorld.ball.attached = false;
      document.getElementById('title').innerHTML = " ";
    }
    else if(e.keyCode == 27){
      //esc
      console.log("Escape key pressed.");
      gameWorld.paused();
    }
  }
  var keyUpHandler = function(e){
    if(e.key == "Right" || e.key == "ArrowRight")
      gameWorld.paddle.rightPressed = false;
    else if(e.key == "Left" || e.key == "ArrowLeft")
      gameWorld.paddle.leftPressed = false;
    else if(e.key == 32){
      //space released
    }
  }
  
  //TOUCH CONTROLS
  var touchStartHandler = function(e){
    e.preventDefault();
    gameWorld.paddle.position.x = e.touches[0].clientX - gameWorld.paddle.w / 2;
  }
  var touchMoveHandler = function(e){
    e.preventDefault();
    gameWorld.paddle.position.x = e.touches[0].clientX - gameWorld.paddle.w / 2;
    if(gameWorld.paddle.position.x + gameWorld.paddle.w > gameWorld.getScreenDimensions().width)
        gameWorld.paddle.position.x = gameWorld.getScreenDimensions().width - gameWorld.paddle.w;
    else if(gameWorld.paddle.position.x < 0)
        gameWorld.paddle.position.x = 0;
  }
  var touchEndHandler = function(e){
    if(gameWorld.ball.attached === true){
      gameWorld.ball.calculateStartAngle();
      gameWorld.ball.attached = false;
      document.getElementById('title').innerHTML = " ";
    }
    e.preventDefault();
  }
}
