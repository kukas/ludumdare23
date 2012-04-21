var eventhandler, game;
function init(){
	// vytvoření canvasu
	var canvas = document.createElement("canvas");
	// eventhandler zpravuje klávesnici a myš
	eventhandler = new Eventhandler( canvas );
	// game je hlavní objekt celé hry
	game = new Game(canvas);
	// přidávám canvas do html
	document.body.appendChild( canvas );
	// při resizu se změní poloha canvasu -> bude vždy uprostřed
	window.addEventListener( "resize", function(){ center(canvas) }, true );
	center(canvas);
}

function center(c){
	c.style.position = "absolute";
	c.style.top = (window.innerHeight - c.height)/2.5+"px"
	c.style.left = (window.innerWidth - c.width)/2+"px"
}