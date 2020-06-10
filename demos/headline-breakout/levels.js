import Brick from './brick.js';

/*
  0 = no brick
  1 = special brick
  2 = invincible brick
  3 = 1 hit brick
  4 = 2 hit brick
  5 = 3 hit brick
*/

export const level1 = [
  [ 3, 3, 3, 3 ],
  [ 3, 3, 3, 3 ],
  [ 3, 3, 3, 3 ],
  [ 3, 3, 3, 3 ] 
];

export const level2 = [
  [ 3, 3, 3, 3 ],
  [ 3, 3, 1, 3 ],
  [ 3, 3, 3, 3 ],
  [ 4, 4, 4, 4 ]
];

export const level3 = [
  [ 3, 3, 3, 3 ],
  [ 4, 4, 4, 4 ],
  [ 4, 4, 1, 4 ],
  [ 5, 5, 5, 5 ]
];

export const level4 = [
  [ 5, 5, 5, 5, 5 ],
  [ 5, 5, 5, 5, 5 ],
  [ 4, 4, 4, 4, 4 ],
  [ 3, 3, 3, 3, 3 ]
];

export const level5 = [
  [ 3, 5, 5, 5, 3 ],
  [ 3, 5, 1, 5, 3 ],
  [ 3, 5, 5, 5, 3 ],
  [ 4, 4, 4, 4, 4 ]
];

export const level6 = [
  [ 1, 4, 4, 4, 4 ],
  [ 2, 2, 4, 2, 2 ],
  [ 2, 4, 4, 4, 2 ],
  [ 2, 2, 3, 2, 2 ]
];

export const level7 = [
  [ 3, 5, 5, 5, 3 ],
  [ 3, 5, 1, 5, 3 ],
  [ 3, 5, 5, 5, 3 ],
  [ 4, 4, 4, 4, 4 ]
];

export const level8 = [
  [ 3, 5, 5, 5, 3 ],
  [ 3, 5, 1, 5, 3 ],
  [ 3, 5, 5, 5, 3 ],
  [ 4, 4, 4, 4, 4 ]
];

export function buildLevel(gameWorld, level){
  var bricks = [];
  var canvasWidth = gameWorld.getScreenDimensions().width;
  var canvasHeight = gameWorld.getScreenDimensions().height;
  
  var bricksInRow = 0;
  var topSpace = 100;
  var brickHeight = 30;
  
  let createBrick = function(brickNum, rowNum, isSpecial, isInvincible, hp, color){
    let pos = {
      x: canvasWidth / bricksInRow * brickNum, 
      y: topSpace + brickHeight * rowNum
    }
    bricks.push(new Brick(bricksInRow, pos, gameWorld, isSpecial, isInvincible, hp, color));
  }
  
  //loop through rows in the level 2d array
  level.forEach((row, rowNumber) => {
    //get number of bricks in row
    row.forEach((brick) => {
      ++bricksInRow;
    });

    row.forEach((brick, brickNumber) => {
      
      switch(brick){
        case 1:
          //special brick
          createBrick(brickNumber, rowNumber, true, false, 1, '#ffffff');
          break;
        case 2:
          //invincible brick
          createBrick(brickNumber, rowNumber, false, true, 0, '#837E7C');
          break;
        case 3:
          //one hit
          createBrick(brickNumber, rowNumber, false, false, 1, '#ADDFFF');
          break;
        case 4:
          //two hits
          createBrick(brickNumber, rowNumber, false, false, 2, '#79BAEC');
          break;
        case 5:
          //three hits
          createBrick(brickNumber, rowNumber, false, false, 3, '#306EFF');
          break;
        default:
          break;
      }
    });
    bricksInRow = 0;
  });
  
  return bricks;
}
