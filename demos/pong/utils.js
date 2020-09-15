export function timeStamp(){
  return window.performance && window.performance.now ? window.performance.now() : new Date().getTime();
}

export function drawText(text, w, h, color, type, font, align, context){
  context.font = font;
  context.textAlign = align;
  switch(type){
    case "stroke":
      context.strokeStyle = color;
      context.strokeText(text, w, h);
      break;
    case "fill":
      context.fillStyle = color;
      context.fillText(text, w, h);
      break;
    default:
      console.log("Unknown type.");
      break;
  }
}

export function getRndFloat(min, max) {
  return Math.random() * (max - min) + min;
}

export function isCollision(ball, paddle){
  if(ball.position.x - ball.radius <= paddle.position.x + paddle.width &&
    ball.position.x + ball.radius >= paddle.position.x &&
    ball.position.y + ball.radius >= paddle.position.y &&
    ball.position.y - ball.radius <= paddle.position.y + paddle.height){
    return true;
  }
  else
    return false;
}
