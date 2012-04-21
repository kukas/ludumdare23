function Cell(){
	this.render = function(ctx){
		ctx.strokeRect(this.x, this.y, 10,10);
	}
}

Cell.prototype = new Object2D();