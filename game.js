function Game(canvas){
	this.canvas = canvas;
	this.ctx = this.canvas.getContext("2d");
	this.width = this.canvas.width = 800;
	this.height = this.canvas.height = 480;

	this.gui = new GUI( this.ctx );

	// this.gui.addText("test", "Qaterknan productions", this.width/2,  this.height/2,"30pt QuicksandLight","rgba(32,32,32,1)");
	this.gui.addRectangle("lista",0,480-40, 800,40,"#222");
	this.gui.addText("resources","Carbon: 000   Nitrogen: 000   Oxygen: 000",620,464,"15px QuicksandLight","#aaa")

	this.colliding = function (o1,o2){
		var vzd = (o1.x-o2.x)*(o1.x-o2.x)+(o1.y-o2.y)*(o1.y-o2.y);
		if(vzd <= (o1.radius+o2.radius)*(o1.radius+o2.radius)){
			return true;
		}
		else{ return false; }
	};
	this.inObjects = function(x,y){
		for(var i = this.objects.length; i--; ){
			var dx = x - this.objects[i].x;
			var dy = y - this.objects[i].y;
			if( dx*dx + dy*dy < this.objects[i].radius*this.objects[i].radius ){
				return true;
			}
		}
		return false;
	}

	this.selector = new Selector();

	this.level=new Level();
	this.init_level = function (id){
		for(i in this.level[id]){
			this.objects[i]=this.level[id][i];
		};
	};
	
	this.objects = [ new Cell(100,100),new Cell(300,100),new Cell(100,300) ];

	this.selected = [];

	this.backgroundImg = new Image();
	this.backgroundImg.src = "Assets/sum.png";
	this.background = this.ctx.createPattern( this.backgroundImg, "repeat" );

	this.debugCube = {x:0,y:0};

	var _this = this;

	setInterval( function(){ _this.render(); _this.tick(); }, 1000/60 );
}
Game.prototype.render = function() {
	
	// this.ctx.clearRect( 0,0, this.width, this.height );
	//this.ctx.drawImage(this.background, 0,0, this.width, this.height )
	this.ctx.fillStyle = this.background;
	this.ctx.fillRect( 0,0, this.width, this.height );

	for(var i = this.objects.length; i--; ){
		this.objects[i].render( this.ctx);
	}

	this.gui.render();

	this.selector.render(this.ctx)

	this.ctx.fillStyle = "#00FF00";
	this.ctx.fillRect(this.debugCube.x-5,this.debugCube.y-5,10,10);
	
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
		if( this.selector.inSelection(x,y) ){
			this.objects[i].selected = true;
			this.selected.push( this.objects[i] );
		}
	};

	this.selectRectangle = {x:0,y:0,width:0,height:0};
};

Game.prototype.targetObjects = function(x,y) {
	// for(var i=this.selected.length; i--;){
	// 	this.selected[i].setTarget(x,y);
	// 	this.selected[i].goToTarget()
	// }
	for(var i = this.objects.length; i--; ){
		if(this.objects[i].selected){
			this.objects[i].setTarget(x,y);
			this.objects[i].goToTarget();
		}
	}
};