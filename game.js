function Game(canvas){
	this.canvas = canvas;
	this.ctx = this.canvas.getContext("2d");
	this.width = this.canvas.width = 800;
	this.height = this.canvas.height = 480;

	this.gui = new GUI( this.ctx );

	this.gui.addText("test", "Qaterknan productions", this.width/2,  this.height/2,"30pt QuicksandLight","rgba(32,32,32,1)");

	this.colliding = function (o1,o2){
		var vzd = (o1.x-o2.x)*(o1.x-o2.x)+(o1.y-o2.y)*(o1.y-o2.y);
		if(vzd <= (o1.radius+o2.radius)*(o1.radius+o2.radius)){
			return true;
		}
		else{ return false; }
	};

	function Selector(){
		this.rectangle = {
			x:0,
			y:0,
			width:0,
			height:0
		};
		this.beginSelect = function(x,y){
			this.rectangle.x = x;
			this.rectangle.y = y;
		};
		this.moveSelect = function(x,y){
			this.rectangle.width = x - this.rectangle.x;
			this.rectangle.height = y - this.rectangle.y;
		};
		this.closeSelect = function(){
			this.rectangle = {
				x:0,
				y:0,
				width:0,
				height:0
			};
		}
		this.inSelection = function(x,y){
			if( this.rectangle.width < 0 ){
				this.rectangle.x += this.rectangle.width;
				this.rectangle.width = -this.rectangle.width;
			}
			if( this.rectangle.height < 0 ){
				this.rectangle.y += this.rectangle.height;
				this.rectangle.height = -this.rectangle.height;
			}

			return this.rectangle.x < x && this.rectangle.x+this.rectangle.width > x &&	this.rectangle.y < y && this.rectangle.y+this.rectangle.height > y;
		}
		this.render = function(ctx){
			if(this.rectangle.width !== 0 && this.rectangle.height !== 0){
				ctx.fillStyle = "rgba(20,20,120,0.1)";
				ctx.fillRect( this.rectangle.x,this.rectangle.y,this.rectangle.width,this.rectangle.height );
				ctx.strokeStyle = "rgba(20,20,120,1)";
				ctx.strokeRect( this.rectangle.x,this.rectangle.y,this.rectangle.width,this.rectangle.height );
			}
		};
	}

	this.selector = new Selector();
	
	this.camera = {x:0,y:0};

	this.objects = [ new Cell(100,100) ];

	this.selected = [];

	this.backgroundImg = new Image();
	this.backgroundImg.src = "Assets/sum.png";
	this.background = this.ctx.createPattern( this.backgroundImg, "repeat" );

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
	for(var i=this.selected.length; i--;){
		this.selected[i].setTarget(x,y);
		this.selected[i].goToTarget()
	}
};