function Game(canvas){
	this.canvas = canvas;
	this.ctx = this.canvas.getContext("2d");
	this.width = this.canvas.width = 800;
	this.height = this.canvas.height = 480;

	this.gui = new GUI( this.ctx );

	this.gui.addText("test", "Qaterknan productions", this.width/2,  this.height/2,"30pt sans-serif","rgb(255,0,0)");


	this.camera = {x:0,y:0};

	this.objects = [ new Cell(10,10) ];

	var _this = this;

	setInterval( function(){ _this.render(); _this.tick(); }, 1000/60 );
}
Game.prototype.render = function() {
	
	this.ctx.clearRect( 0,0, this.width, this.height );

	for(var i = this.objects.length; i--; ){
		this.objects[i].render( this.ctx );
	}

	this.gui.render();
};

Game.prototype.tick = function() {
	for(var i = this.objects.length; i--; ){
		this.objects[i].tick();
	}
};