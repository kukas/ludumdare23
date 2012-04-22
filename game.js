function Game(canvas){
	var _this = this;
	this.canvas = canvas;
	this.ctx = this.canvas.getContext("2d");
	this.width = this.canvas.width = 800;
	this.height = this.canvas.height = 480;

	this.gui = new GUI( this.ctx );

	// this.gui.addText("test", "Qaterknan productions", this.width/2,  this.height/2,"30pt QuicksandLight","rgba(32,32,32,1)");
	this.gui.addRectangle("lista",0,480-40, 800,40,"#222");
	this.gui.addButton("action1",10,480-35, 60,30,"#bbb");
	this.gui.addButton("action2",80,480-35, 60,30,"#bbb");
	this.gui.addButton("action3",150,480-35, 60,30,"#bbb");
	this.gui.addButton("action4",220,480-35, 60,30,"#bbb");
	this.gui.addText("resources","Carbon: 000   Nitrogen: 000   Oxygen: 000",620,464,"15px QuicksandLight","#bbb")

	this.selector = new Selector();
	this.level;

	
	this.objects = [];

	this.selected = [];

	this.background = new Image();

	this.debugCube = {x:0,y:0};

	this.init_level = function(src){
		level_script = document.createElement("script");
		document.body.appendChild( level_script )
		level_script.src = src;
		level_script.onload = function(){
			_this.level = level;
			_this.objects = level.objects;
			_this.background.src = level.background;

			setInterval( function(){ _this.render(); _this.tick(); }, 1000/60 );
		}
	};

	this.init_level("level.js");
}

Game.prototype.render = function() {
	
	// this.ctx.clearRect( 0,0, this.width, this.height );
	this.ctx.drawImage(this.background, 0,0, this.width, this.height )
	// this.ctx.fillStyle = this.background;
	// this.ctx.fillRect( 0,0, this.width, this.height );

	for(var i = this.objects.length; i--; ){
		this.objects[i].render( this.ctx);
	}

	this.gui.render();

	this.selector.render(this.ctx)

	this.ctx.fillStyle = "#00FF00";
	this.ctx.fillRect(this.debugCube.x-5,this.debugCube.y-5,10,10);
	
};

Game.prototype.colliding = function (o1,o2){
	var vzd = (o1.x-o2.x)*(o1.x-o2.x)+(o1.y-o2.y)*(o1.y-o2.y);
	if(vzd <= (o1.radius+o2.radius)*(o1.radius+o2.radius)){
		return true;
	}
	else{ return false; }
};
Game.prototype.findCollisions = function( obj ){
	for(var i = this.objects.length; i--; ){
		var dx = obj.x - this.objects[i].x;
		var dy = obj.y - this.objects[i].y;
		var minLength = this.objects[i].radius+obj.radius;

		if( obj == this.objects[i] ) continue

		if( dx*dx + dy*dy < minLength*minLength ){
			return this.objects[i];
		}
	}
	return false;
}
Game.prototype.inObjects = function(x,y){
	for(var i = this.objects.length; i--; ){
		var dx = x - this.objects[i].x;
		var dy = y - this.objects[i].y;
		if( dx*dx + dy*dy < this.objects[i].radius*this.objects[i].radius ){
			return this.objects[i];
		}
	}
	return false;
}

Game.prototype.tick = function() {
	for(var i = this.objects.length; i--; ){
		this.objects[i].tick();
	}
	
};

Game.prototype.clearSelected = function(){
	for(var i = this.objects.length; i--; ){
		this.objects[i].selected = false;
		}
}

Game.prototype.selectObjects = function() {
	this.clearSelected();

	for(var i = this.objects.length; i--; ){
		var x = this.objects[i].x;
		var y = this.objects[i].y;
		if( this.selector.inSelection(x,y) ){
			this.objects[i].selected = true;
		}
	};
};

Game.prototype.targetObjects = function(x,y) {
	for(var i = this.objects.length; i--; ){
		if(this.objects[i].selected){
			this.objects[i].setTarget(x,y);
			this.objects[i].goToTarget();
		}
	}
};