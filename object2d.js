function Object2D(){
	this.x = 0;
	this.y = 0;
	this.width=0;
	this.height=0;

	this.selected = false;

	this.target = { x : 0, y : 0 };
	this.speed = 10; // px

	this.vector = { x : 0, y : 0 };

	this.rotation = 0;
}

Object2D.prototype.move = function() {
	this.x += this.vector.x;
	this.y += this.vector.y;
};

Object2D.prototype.accelerate = function(vec) {
	this.vector.x += vec.x;
	this.vector.y += vec.x;
};

Object2D.prototype.goToTarget = function() {
	dx = this.target.x - this.x;
	dy = this.target.y - this.y;
	console.log([dx,this.target.x])
	if( dx*dx + dy*dy >= this.speed*this.speed ){
		var a = Math.atan(dx/dy);
		this.vector.x = Math.sin(a)*this.speed;
		this.vector.y = Math.cos(a)*this.speed;
	}
	else {
		console.log("dffas")
	}

};

Object2D.prototype.setTarget = function(x,y) {
	this.target.x = x;
	this.target.y = y;
};

Object2D.prototype.render = function(ctx) {

};

Object2D.prototype.tick = function() {

};