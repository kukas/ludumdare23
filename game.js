function Game(canvas){
	this.canvas = canvas;
	this.ctx = this.canvas.getContext("2d");
	this.width = this.canvas.width = 800;
	this.height = this.canvas.height = 480;

	this.gui = new GUI( this.ctx );

	this.gui.addText("test", "Qaterknan productions", this.width/2,  this.height/2,"30pt sans-serif","rgb(255,0,0)");


	this.camera = {x:0,y:0};

	this.objects = [ new Cell(10,10) ];

	this.selectRectangle = { x:0,y:0,width:0,height:0 };

	this.selected = [];

	var _this = this;

	setInterval( function(){ _this.render(); _this.tick(); }, 1000/60 );
}
Game.prototype.render = function() {
	
	this.ctx.clearRect( 0,0, this.width, this.height );

	for(var i = this.objects.length; i--; ){
		this.objects[i].render( this.ctx );
	}

	if(this.selectRectangle.width !== 0 && this.selectRectangle.height !== 0)
		this.ctx.strokeRect( this.selectRectangle.x,this.selectRectangle.y,this.selectRectangle.width,this.selectRectangle.height );

	this.gui.render();
};

Game.prototype.tick = function() {
	for(var i = this.objects.length; i--; ){
		this.objects[i].tick();
	}
};

Game.prototype.selectObjects = function() {
	for(var i=this.selected.length; i--;){
		this.selected[i].selected = false;
	}
	this.selected = [];

	for(var i = this.objects.length; i--; ){
		var x = this.objects[i].x;
		var y = this.objects[i].y;
		if( this.selectRectangle.x < x && this.selectRectangle.x+this.selectRectangle.width > x &&
			this.selectRectangle.y < y && this.selectRectangle.y+this.selectRectangle.height > y ){
			this.objects[i].selected = true;
			this.selected.push( this.objects[i] );
		}
	};

	this.selectRectangle = {x:0,y:0,width:0,height:0};
};

Game.prototype.targetObjects = function(x,y) {
	for(var i=this.selected.length; i--;){
		this.selected[i].setTarget(x,y);
		this.selected[i].goToTarget()
	}
};