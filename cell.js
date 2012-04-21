function Cell(x,y){

	this.x = x;
	this.y = y;

	this.vector = { x:1,y:0 };

	this.organely = {
		jadro : {  }
	};
	this.render = function(ctx){
		ctx.strokeRect(this.x, this.y, 10,10);
	};
	this.tick = function(){
		this.move();
	}
}

Cell.prototype = new Object2D();