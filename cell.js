function Cell(x,y){
	this.x = x;
	this.y = y;

	this.vector = { x:0.5,y:0 };

	this.organely = {
		jadro : {  },
		mitochondrie : {  }
	};
	this.render = function(ctx){
		if(this.selected) ctx.strokeStyle = "green";
		else ctx.strokeStyle = "red";
		ctx.strokeRect(this.x, this.y, 10,10);
	};
	this.tick = function(){
		this.move();
	}
}

Cell.prototype = new Object2D();