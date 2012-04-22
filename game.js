function Game(canvas){
	var _this = this;
	this.canvas = canvas;
	this.ctx = this.canvas.getContext("2d");
	this.width = this.canvas.width = 800;
	this.height = this.canvas.height = 480;

	this.gui = new GUI( this.ctx );

	// this.gui.addText("test", "Qaterknan productions", this.width/2,  this.height/2,"30pt QuicksandLight","rgba(32,32,32,1)");
	this.gui.addRectangle("lista",0,this.height-40, this.width,40,"#222");
	this.gui.addButton("action1",10,this.height-35, 60,30,"Assets/tlacitko_kasarna.png","#d33",function(){
		console.log("button 1");
	});
	this.gui.addButton("action2",80,this.height-35, 60,30,"Assets/tlacitko_tovarna.png","#d33",function(){
		console.log("button 2");
	});
	this.gui.addButton("action3",150,this.height-35, 60,30,"Assets/tlacitko_kasarna.png","#d33",function(){
		console.log("button 3");
	});
	this.gui.addButton("action4",220,this.height-35, 60,30,"Assets/tlacitko_kasarna.png","#d33",function(){
		console.log("button 4");
	});

	this.gui.addText("carbon","Carbon:",430,this.height-16,"15px QuicksandLight","#bbb");
	this.gui.addText("carbonValue", "000", 500,this.height -16,"15px QuicksandLight","#bbb");
	this.gui.addText("nitrogen","Nitrogen:",550,this.height-16,"15px QuicksandLight","#bbb");
	this.gui.addText("nitrogenValue", "000", 630,this.height -16,"15px QuicksandLight","#bbb");
	this.gui.addText("oxygen","Oxygen:",680,this.height-16,"15px QuicksandLight","#bbb");
	this.gui.addText("oxygenValue", "000", 750,this.height -16,"15px QuicksandLight","#bbb");

	this.selector = new Selector();
	this.level;

	this.resources = {
		carbon:10,
		nitrogen:20,
		oxygen:5
	}

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
	this.drawResources();
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

Game.prototype.drawResources = function( obj ){
	for(i in this.resources){
		this.gui.changeText( i+"Value", ""+this.resources[i] );
	}
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