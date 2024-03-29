function Selector(){
	this.active = false;
	this.rectangle = {
		x:0,
		y:0,
		width:0,
		height:0,
		radius:Math.sqrt(this.width*this.width+this.height*this.height)
	};

	this.beginSelect = function(x,y){
		this.closeSelect();
		this.active = true;
		this.rectangle.x = x;
		this.rectangle.y = y;

		var objects = game.inObjects(x,y);
		if(objects){
			objects.selected = true;
			if(objects instanceof Nanobot) objects.changeMenu();
		}
	};

	this.moveSelect = function(x,y){
		this.rectangle.width = x - this.rectangle.x;
		this.rectangle.height = y - this.rectangle.y;
	};

	this.closeSelect = function(){
		this.active = false;
		this.rectangle = {
			x:0,
			y:0,
			width:0,
			height:0
		};
	};

	this.inSelection = function(_x,_y){
		var x = game.camera.tX(_x);
		var y = game.camera.tY(_y);

		if( this.rectangle.width < 0 ){
			this.rectangle.x += this.rectangle.width;
			this.rectangle.width = -this.rectangle.width;
		}
		if( this.rectangle.height < 0 ){
			this.rectangle.y += this.rectangle.height;
			this.rectangle.height = -this.rectangle.height;
		}

		return this.rectangle.x < x && this.rectangle.x+this.rectangle.width > x &&	this.rectangle.y < y && this.rectangle.y+this.rectangle.height > y;
	};
	
	this.render = function(ctx){
		if(this.active){
			ctx.fillStyle = "rgba(20,20,120,0.1)";
			ctx.fillRect( this.rectangle.x,this.rectangle.y,this.rectangle.width,this.rectangle.height );
			ctx.strokeStyle = "rgba(20,20,120,1)";
			ctx.strokeRect( this.rectangle.x,this.rectangle.y,this.rectangle.width,this.rectangle.height );
		}
	};
}