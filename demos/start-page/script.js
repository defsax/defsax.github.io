document.addEventListener('DOMContentLoaded', function(e){  
  
  const sButton = document.getElementById("searchbutton");
  const decSecondsRange = { min: 0, max: 86400 };
//const hexSecondsRange = { min: 0, max: 65535 };
//const hexSecondsRange = { min: 0, max: 1048575 };
  const hexSecondsRange = { min: 0, max: 16777215 };
  
  setTime();
  setDate();
  setStyle();
  setInterval(setTime, 1000);
  
  
  sButton.addEventListener("click", search);
  document.addEventListener("keydown", function(ev){
    if(ev.keyCode === 13) {
      sButton.style.transform = "translate(3px, 3px)";
      sButton.style.boxShadow = "3px 3px rgb(60, 60, 60)";
      search();
    }
  });
  
  
  function setTime(){
    let date = new Date();
    var secs = date.getSeconds();
    var mins = date.getMinutes();
    var hours = date.getHours();
    
    if(secs < 10)
      secs = "0" + date.getSeconds();
    if(mins < 10)
      mins = "0" + date.getMinutes();
    if(hours < 10)
      hours = "0" + date.getHours();
    
    document.getElementById("time").innerHTML = hours + ":" + mins + ":" + secs;
    document.getElementById("hex").innerHTML = convert();
  }
  
  function setDate(){
    let date = new Date();
    document.getElementById("date").innerHTML = date.toDateString().substr(4);  
  }
  
  function setStyle(){
    var title = document.getElementById("title");
    let date = new Date();
    let day = date.getDay();
    let days = [ "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday" ];
    let hour = date.getHours();
    let msg = " ";
    
    let colour = "#000";
    let text = "#fff";
    
    switch(true){
      case (hour < 4):
        colour = "#000011";
        text = "#fff";
        msg = "It's " + days[day] + " now. Go to bed!";
        break;
      case (hour < 12):
        colour = "#ffff33";
        text = "#000";
        msg = "Good morning! It's " + days[day] + ".";
        break;
      case (hour < 17):
        colour = "#66ccff";
        text = "#000";
        msg = "Good afternoon! It's " + days[day] + ".";
        break;
      case (hour < 24):
        colour = "#ad33ff";
        text = "#fff";
        msg = "Good evening! It's " + days[day] + ".";
        break;
    }
    document.querySelector(":root").style.setProperty("--textcolour", text);
    document.querySelector(":root").style.setProperty("--backcolour", colour);
    title.innerHTML = msg;
  }
  
  function search(){
    const str = document.getElementById("searchbar").value;
    const output = "https://duckduckgo.com/?q=" + str;
    location.href = output;
  }
  
  function convert(){
    let normalized = normalize(secsSinceMidnight(), decSecondsRange, hexSecondsRange);
    
    let hexTime = normalized.toString(16);
    document.getElementById("hex").style.color = "#" + hexTime;    
    
    switch(hexTime.length){
      case 3:
        document.getElementById("hex").style.color = "#" + hexTime + 000;
        hexTime = hexTime.slice(0, 1) + "_" + hexTime.slice(1, 3);
        break;
      case 4:
        document.getElementById("hex").style.color = "#" + hexTime + 00;
        hexTime = hexTime.slice(0, 1) + "_" + hexTime.slice(1, 3) + "_" + hexTime.slice(3, 4);
        break;
      case 5:
        document.getElementById("hex").style.color = "#" + hexTime + 0;
        hexTime = hexTime.slice(0, 1) + "_" + hexTime.slice(1, 3) + "_" + hexTime.slice(3, 5);
        break;
      default:
        document.getElementById("hex").style.color = "#" + hexTime;
        hexTime = hexTime.slice(0, 1) + "_" + hexTime.slice(1, 3) + "_" + hexTime.slice(3, 5) + "_" + hexTime.slice(5, 6);
        break;
    }
    
    return hexTime;
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
});
