export function reset(){
  document.location.reload();
}
export function timeStamp(){
  return window.performance && window.performance.now ? window.performance.now() : new Date().getTime();
}
export function getRndFloat(min, max) {
  return Math.random() * (max - min) + min;
}
export function adjustFontSize(element){
  //scale font to fit screen on paddle hit
  let headline = document.getElementById(element);
  headline.style.fontSize = '250px';
  let hlFontSize = window.getComputedStyle(headline, null).getPropertyValue('font-size');
  
  //adjust font to available canvas height
  while(headline.clientHeight > window.innerHeight){
    hlFontSize = window.getComputedStyle(headline, null).getPropertyValue('font-size');
    let fontSize = parseInt(hlFontSize);
    headline.style.fontSize = (fontSize - 10) + 'px';
  }
  //adjust font to available canvas width (for mobile or vertical)
  while(headline.clientWidth > document.body.clientWidth){
    hlFontSize = window.getComputedStyle(headline, null).getPropertyValue('font-size');
    let fontSize = parseInt(hlFontSize);
    headline.style.fontSize = (fontSize - 10) + 'px';
  }
}
export function randomizeColor(){
  var letters = '0123456789ABCDEF';
  let color = '#';
  for (var i = 0; i < 6; i++){
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

export function areColliding(obj1, obj2){
  if(obj1.position.x - obj1.radius <= obj2.position.x + obj2.w   &&
      obj1.position.x + obj1.radius >= obj2.position.x &&
      obj1.position.y - obj1.radius <= obj2.position.y + obj2.h  &&
      obj1.position.y + obj1.radius >= obj2.position.y)
    return true;
  else
    return false;
}

export function rectCollision(obj1, obj2){
  if(obj1.position.x - obj1.w <= obj2.position.x + obj2.w   &&
      obj1.position.x + obj1.w >= obj2.position.x &&
      obj1.position.y - obj1.h <= obj2.position.y + obj2.h  &&
      obj1.position.y + obj1.h >= obj2.position.y)
    return true;
  else
    return false;
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
