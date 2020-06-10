import Ball from './ball.js';
import Paddle from './paddle.js';
import { buildLevel, level1, level2, level3, level4, level5, level6, level7, level8 } from './levels.js';
import InputHandler from './input.js';
import HeadlineHandler from './headline.js';
import * as utils from './utilities.js';

export default function World(w, h) {
  //private properties
  var objects = [];
  var screenDimensions = { width: w, height: h }; //canvas reference
  var powerUpQueue = [];
  var currentPower;
  var currentLevel = 0;
  
  const GAMESTATE = {
    PAUSED: 0,
    RUNNING: 1, 
    MENU: 2,
    GAMEOVER: 3
  };
  
  //public properties
  this.balls = [];
  this.bricks = [];
  this.levels = [ level1, level2, level3, level4, level5, level6, level7, level8 ];
  this.message = " ";
  this.score = 0;
  this.paddleWidth = 75;
  this.ballSpeed = 200;
  this.gameOver = false; //accessible from main.js
  this.powerUpActive = false;
  this.elapsed = 0;
  this.duration = 10;
  
  //public methods
  this.start = function(){
    
    //starting gamestate
    this.GAMESTATE = GAMESTATE.RUNNING;
    
    //load headlines
    this.headlines = new HeadlineHandler();
    
    /*
     * rss feeds
     * nytimes, huffpo, bbc, cbc, hackernews
    */
    this.headlines.addFeed('https://rss.nytimes.com/services/xml/rss/nyt/HomePage.xml');
    this.headlines.addFeed('http://feeds.bbci.co.uk/news/rss.xml');
    this.headlines.addFeed('https://www.huffpost.com/section/front-page/feed?x=1');
    this.headlines.addFeed('https://www.cbc.ca/cmlink/rss-topstories');
    this.headlines.addFeed('https://hnrss.org/frontpage');
    this.headlines.initialize();
    
    //instantiate objects
    this.ball = new Ball(this, 20, 20, 10, this.ballSpeed);
    this.ball.color = utils.randomizeColor();
    this.balls.push(this.ball);
    this.paddle = new Paddle(this, this.paddleWidth, 10, 300);
    this.bricks = new buildLevel(this, this.levels[currentLevel]);
    
    //add objects to array
    objects.push(this.paddle);
    
    //initialize input handler
    this.inputHandler = new InputHandler(this);
    this.inputHandler.initialize();
    
    this.initMenu();
  };
  this.update = function(dt){
    //skip rest of function if gamestate is paused.
    if(this.GAMESTATE === GAMESTATE.PAUSED) return;
    
    //update objects
    //objects.forEach(object => object.update(dt));
    [...objects, ...this.balls, ...this.bricks].forEach(object => object.update(dt));
    
    //delete objects marked for deletion using array.prototype.filter
    objects = objects.filter(object => !object.deleted);
    this.balls = this.balls.filter(b => !b.deleted);
    this.bricks = this.bricks.filter(brick => !brick.deleted);
    
    //check if we should load new level
    if(this.bricks.length === 0 || this.bricks.every(brick => brick.invincible)){
      currentLevel++;
      console.log("Level Completed");
      this.reset();
    }
    
    //update powerup timer
    if(this.powerUpActive){
      this.elapsed += dt;
    }
    
    //if powerup time is up
    if(this.elapsed >= this.duration){
      console.log("Powerup time up.");
      //reset timer
      this.elapsed = 0;
      this.powerUpActive = false;
      currentPower.stop();
      currentPower = undefined;
    }
  };
  
  this.draw = function(ctx){
    //call each object's draw function using spread operator
    [...objects, ...this.balls, ...this.bricks].forEach(object => object.draw(ctx));
    
    //display current power up
    utils.drawText(this.message, screenDimensions.width - 5, 75, "black", "fill", "20px Arial", "right", ctx);
    
    //display score
    utils.drawText("Score: " + this.score, screenDimensions.width - 5, 50, "black", "fill", "20px Arial", "right", ctx);
    
    //display current level
    utils.drawText("Level: " + currentLevel, screenDimensions.width - 5, 25, "black", "fill", "20px Arial", "right", ctx);
    
    
    if(this.GAMESTATE === GAMESTATE.PAUSED){
      this.pauseOverlay(ctx);
    }
  };
  
  this.reset = function(){
    
    console.log("Total levels: " + this.levels.length);
    if(currentLevel < this.levels.length){
      //reset objects
      this.balls = [];
      this.bricks = [];
      this.paddle = null;
      this.paddle = undefined;
      objects = [];
      
      //re-instantiate objects
      this.ball = new Ball(this, 20, 20, 10, this.ballSpeed);
      this.ball.color = utils.randomizeColor();
      this.balls.push(this.ball);
      
      this.paddle = new Paddle(this, this.paddleWidth, 10, 300);
      objects.push(this.paddle);
      
      this.bricks = new buildLevel(this, this.levels[currentLevel]);
      
      document.getElementById("title").innerHTML = "SPACE / RELEASE TO START";
      utils.adjustFontSize('title');
    }else{
      console.log("All levels complete.");
      document.getElementById("title").innerHTML = "ALL LEVELS COMPLETE<br>SCORE: " + this.score;
      document.getElementById("title").style.pointerEvents = "none";
      utils.adjustFontSize('title');
      this.gameOver = true;
    }
  };
  
  this.addObject = function(obj){
    objects.push(obj);
  };
  this.setPowerUp = function(obj){
    if(currentPower === undefined && obj !== undefined){
      currentPower = obj;
      currentPower.start();
      this.powerUpActive = true;
    }
    else
      console.log("Powerup already active.");
  };
  this.listObjects = function(){
    if(objects){
      for(let i = 0; i < objects.length; i++){
        console.log(objects[i]);
      }
    }
  };  
  this.getScreenDimensions = function(){ 
    return screenDimensions; 
  };
  this.paused = function(){
    if(this.GAMESTATE === GAMESTATE.RUNNING){
      this.GAMESTATE = GAMESTATE.PAUSED;
      console.log("GAME PAUSE");
      document.getElementById("title").style.display = "none";
      document.getElementById("opener").style.display = "none";
      document.getElementById("nav-bar").style.display = "block";
    }
    else{
      this.GAMESTATE = GAMESTATE.RUNNING;
      if(!this.gameOver)
        document.getElementById("title").style.display = "block";
      
      document.getElementById("opener").style.display = "block";
      document.getElementById("nav-bar").style.display = "none";
    }
  };
  this.pauseOverlay = function(ctx){
    ctx.beginPath();
    ctx.rect(0, 0, screenDimensions.width, screenDimensions.height);
    ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
    ctx.fill();
    ctx.closePath();
    
    utils.drawText("PAUSED", 
                   screenDimensions.width / 2, 
                   screenDimensions.height / 2, 
                   "white", 
                   "fill", 
                   "100px Arial",
                   "center",
                   ctx);
  };
  this.initMenu = function(){
    //code for accordion
    var acc = document.getElementsByClassName("accordo");
    var i;

    for(let i = 0; i < acc.length; i++){
      acc[i].addEventListener("click", function(){
        /*togel between adding and removing the active class, to highlight the button that controls the panel*/
        this.classList.toggle("active");
        
        /*toggel between hiding and showing the active panel*/
        var panel = this.nextElementSibling;
        if(panel.style.display === "block"){
          panel.style.display = "none";
        } else {
          panel.style.display = "block";
        }
      });
    }
  };
}
