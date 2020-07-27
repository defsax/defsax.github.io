/*
  * http://www.intuitor.com/hex/hexclock.html

  1 hexsecond   = 1.3110 (1.5216) seconds
  1 second      = 0.75910 (0.C2316) hexseconds
  1 hexminute   = 0.35210 (0.5A016) minutes
  1 minute      = 2.8410 (2.D816) hexminutes
  1 hexhour     = 1.510 (1.816) hours
  1 hour        = 0.66710 (0.AAB16) hexhours
*/  

var hexClockEnabled = true;

const decSecondsRange = { min: 0, max: 86400 };
// const hexSecondsRange = { min: 0, max: 66535 };
// const hexSecondsRange = { min: 0, max: 1048575 };
const hexSecondsRange = { min: 0, max: 16777215 };

document.getElementById("decimal").addEventListener("click", function(){ 
  hexClockEnabled = false;
});
document.getElementById("hexi").addEventListener("click", function(){ 
  hexClockEnabled = true;
});
document.addEventListener("DOMContentLoaded", () =>{
    clockLoop();
});

function clockLoop(){
  if(hexClockEnabled === true){
    hexClock();
  }
  else{
    decimalClock();
  }
  requestAnimationFrame(clockLoop);
}
requestAnimationFrame(clockLoop);

function decimalClock(){
  let date = new Date();
  
  let h = date.getHours().toString();
  let m = date.getMinutes().toString();
  let s = date.getSeconds().toString();
  
  if(h.length < 2)
    h = '0' + h;
  if(m.length < 2)
    m = '0' + m;
  if(s.length < 2)
    s = '0' + s;
  
  background.style.backgroundColor = "#" + h + m + s;
  document.getElementById("time").innerHTML = "#" + h + m + s;
}

function hexClock(){
  background.style.backgroundColor = convert();
}

function convert(){
  let normalized = normalize(secsSinceMidnight(), decSecondsRange, hexSecondsRange);
  
  let backCol = normalized.toString(16);
  document.getElementById("time").innerHTML = "." + backCol;
  
  if(backCol.length === 3)
    backCol = "#" + 0 + 0 + 0 + backCol;
  else if(backCol.length === 4)
    backCol = "#" + 0 + 0 + backCol;
  else if(backCol.length === 5)
    backCol = "#" + 0 + backCol;
  else
    backCol = "#" + backCol;
  
  return backCol;
}

function secsSinceMidnight(){
  let now = new Date();
  let then = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0);
  let diff = now.getTime() - then.getTime();
  return diff / 1000; 
}

function normalize(x, inRange, outRange){
  
  let normalized = (outRange.max - outRange.min) * ((x - inRange.min) / (inRange.max - inRange.min)) + outRange.min;
  
  return Math.round(normalized);
}
