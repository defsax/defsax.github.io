import World from './world.js';
import * as utils from './utilities.js';

//canvas reference
var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
canvas.width = document.body.clientWidth;
canvas.height = window.innerHeight;

//fit initial message to screen size
utils.adjustFontSize('title');

var world = new World(canvas.width, canvas.height);
world.start();

//timing vars
var now;
var dt = 0;
var last = utils.timeStamp();

function gameLoop(){
  now = utils.timeStamp();
  dt = (now - last) / 1000;
  
  if(!world.gameOver){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    world.update(dt);
    world.draw(ctx);
    
    //visualize deltatime
    //world.drawText(dt.toString(), 10, 25, "black", "fill", ctx);
    
    last = now;
    
    requestAnimationFrame(gameLoop);
  }
};
requestAnimationFrame(gameLoop);

