import Brick from './brick.js';

export const level1 = [
  [ 1, 1, 1, 1, 1, 1, 1, 1, 1 ],
  [ 1, 0, 0, 0, 0, 0, 1 ],
  [ 1, 0, 1, 0, 1, 0, 1 ],
  [ 1, 1, 1, 1, 1, 1, 1 ], 
  [ 2, 2, 2, 2, 2, 2, 2 ]
];

export const level2 = [
  [ 2, 2, 2, 2, 2, 2, 2, 2, 2 ],
  [ 2, 2, 2, 2, 2, 2, 2, 2, 2 ],
  [ 2, 2, 2, 2, 2, 2, 2, 2, 2 ],
  [ 2, 2, 2, 2, 2, 2, 2, 2, 2 ],
  [ 2, 2, 2, 2, 2, 2, 2, 2, 2 ]
];

export function buildLevel(gameWorld, level){
  var bricks = [];
  var canvasWidth = gameWorld.getScreenDimensions().width;
  var canvasHeight = gameWorld.getScreenDimensions().height;
  
  var bricksInRow = 0;
  
  
  //loop through rows in the level 2d array
  level.forEach((row, rowNumber) => {
    //console.log("Row: " + row);
    
    //get number of bricks in row
    row.forEach((brick) => {
      ++bricksInRow;
      //console.log(bricksInRow);
    });
    
    //console.log("Row Number: " + rowNumber + "\n\n");
    row.forEach((brick, brickNumber) => {
      //console.log("Brick: " + brick);
      //console.log("Brick Number: " + brickNumber + "\n");
      
      if(brick === 1){
        //console.log("Brick.");
        let pos = {
          x: canvasWidth / bricksInRow * brickNumber, 
          y: 50 + 20 * rowNumber
        }
        bricks.push(new Brick(bricksInRow, pos, gameWorld, false));
      }
      if(brick === 2){
        let pos = {
          x: canvasWidth / bricksInRow * brickNumber, 
          y: 50 + 20 * rowNumber
        }
        bricks.push(new Brick(bricksInRow, pos, gameWorld, true));
      }
      //else
        //console.log("No brick.");
    });
    
    //console.log("\n\n");
    bricksInRow = 0;
  });
  
  return bricks;
}
