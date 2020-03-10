
var array = [
	"a", "b", "c", "d", "e", "f", "g", "h", 
	"i", "j", "k", "l", "m", "n", "o", "p",
	"q", "r", "s", "t", "u", "v", "w", "x", 
	"y", "z", 
	"A", "B", "C", "D", "E", "F", "G", "H",
	"I", "J", "K", "L", "M", "N", "O", "P", 
	"Q", "R", "S", "T", "U", "V", "W", "X",
	"Y", "Z",
	"0", "1", "2", "3", "4", "5", "6", "7", "8", "9",
	"!", "@", "#", "$", "%", "^", "&", "*", 
	"(", ")", "_", "-", "+", "=", ":", ";",
	//"<", open bracket will cause html to hide the rest of the line
	">", ".", "?", "/", "|", "{", "[", "]", "}", 
	" ", "\\", "\'", "\"", "å", "ß", "Ø", "Ö", "Õ",
	];

function loop(data){
	var guess = [];
	for(var i = 0; i < data.msg.length; i++){
		//if guess letter at current element matches word at current 
		//element, push it on array and continue loop
		//otherwise, push on a random char
		if(data.msg[i] == data.word[i]){
			guess.push(data.msg[i]);
			continue;
		}
		else
			guess.push(array[Math.floor(Math.random() * array.length)]);
	}
	data.msg = guess.join('');
	postMessage(guess.join(''));
	setTimeout(function(){loop(data);}, 25);
}

self.addEventListener('message', function(e){
	loop(e.data);
}, false);
