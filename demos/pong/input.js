export default function InputHandler(gameHandle){
  
  this.initialize = function(){
    //input event listeners
    
    //KEY LISTENERS
    document.addEventListener("keydown", keyDownHandler, false);
    document.addEventListener("keyup", keyUpHandler, false);
  
    console.log("Listeners enabled.");
  }
  
  //INPUT CONTROLS
  
  //KEYBOARD CONTROLS
  var keyDownHandler = function(e){
    if(e.key == "Up" || e.key == "ArrowUp"){
      gameHandle.paddleR.userDir = -1;
    }
    else if(e.key == "Down" || e.key == "ArrowDown"){
      gameHandle.paddleR.userDir = 1;
    }
    else if(e.keyCode == 65){
      gameHandle.paddleL.userDir = -1;
    }
    else if(e.keyCode == 90){
      gameHandle.paddleL.userDir = 1;
    }
    else if(e.keyCode == 27)
      console.log("Escape key pressed.");
  }
  var keyUpHandler = function(e){
    if(e.key == "Up" || e.key == "ArrowUp"){
      gameHandle.paddleR.userDir = 0;
    }
    else if(e.key == "Down" || e.key == "ArrowDown"){
      gameHandle.paddleR.userDir = 0;
    }
    else if(e.keyCode == 65){
      gameHandle.paddleL.userDir = 0;
    }
    else if(e.keyCode == 90){
      gameHandle.paddleL.userDir = 0;
    }
  }
}
