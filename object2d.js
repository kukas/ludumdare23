function Object2D(){
	this.x = 0;
	this.y = 0;

	this.vector = { x : 0, y : 0 };
}

Object2D.prototype.move = function() {
	this.x += this.vector.x;
	this.y += this.vector.y;
};

Object2D.prototype.accelerate = function(vec) {
	this.vector.x += vec.x;
	this.vector.y += vec.x;;
};

Object2D.prototype.render = function(ctx) {

};

Object2D.prototype.tick = function() {

};