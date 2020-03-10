
var w;
function start(phrase){
  if(phrase == "about" || 
    phrase == "posts" ||
    phrase == "welcome..." ||
    phrase == "what i'm working on..."){
  
    if(typeof(w) == "undefined"){
      w = new Worker("js/scramble.js");
    }
    else{
      //console.log("Worker already created.");
    }
    
    //store value to be found
    var correctWord = phrase;//"perry defayette";
    sessionStorage.setItem("word", correctWord);

    //create scramble
    //initialize empty array
    var scrambleWord = []; 
    //loop for length of word string
    for(var i = 0; i < correctWord.length; i++){
      //load initial word
      scrambleWord.push("x");
    }

    //send to worker as a json
    w.postMessage({'msg': scrambleWord.join(''), 'word': correctWord});
  }
  else{
    sessionStorage.clear();
		w.terminate();
		w = undefined;
  }
}

//check for worker support, start new if available
if(typeof(Worker) !== "undefined"){
	console.log("Web worker support.");
	
	if(typeof(w) == "undefined"){
		w = new Worker("../js/scramble.js");
	}
	else{
  	console.log('No web worker support.');
	}
}	

//event listener for web worker
w.addEventListener('message', function(e){

	//output
	document.getElementById('title').innerHTML = e.data;
	//console.log(e.data);

	//check for correctness, if matched stop worker and clear data
	if(e.data == sessionStorage.getItem('word')){
		console.log("Word found. Stopping worker.");
		sessionStorage.clear();
		w.terminate();
		w = undefined;
	}
}, false);
