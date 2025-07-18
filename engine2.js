var monkey_01;
var gameTimer;
var output;
var numHits = 0;
var miss = 0;

function init() {
	monkey_01 = document.getElementById('monkey_01');
	output = document.getElementById('output');
	
	gameTimer = setInterval(gameloop, 20);
	placeMonkey();
	}

function gameloop(){
	//output.innerHTML = output.innerHTML + '* ';
	var y = parseInt(monkey_01.style.top) -10;
	if( y < -100) {
		 placeMonkey();
		 missMonkey();
	}
	else {
		monkey_01.style.top = y +'px';
	}
    
}

function placeMonkey(){
	var x = Math.floor(Math.random()*421);
	monkey_01.style.left = x + 'px';
	monkey_01.style.top ='350px';
	}
function hitMonkey(){
	numHits++;
	//output.innerHTML = numHits;
	if(numHits==5) {
	    alert('You win!');
		placeMonkey();
		clearInterval(gameTimer);
    }
}
function missMonkey(){
	miss++;
	if (miss==5){
			 alert('You lose!');
			placeMonkey();
			clearInterval(gameTimer);
	}
	
}
	

		 