function Object2D(){
	this.x = 0;
	this.y = 0;
	this.width=0;
	this.height=0;
	this.radius=Math.sqrt(this.width*this.height+this.height*this.height)/2;

	this.selected = false;

	this.targeting = false;
	this.target = { x : 0, y : 0 };
	this.speed = 5; // px

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
	if(this.targeting){
		dy = this.target.y - this.y;
		dx = this.target.x - this.x;
		if( dx*dx + dy*dy >= this.speed*this.speed ){
			var a = Math.atan(dx/dy);
			if(this.y > this.target.y){
				a += Math.PI;
			}
			this.vector.x = Math.sin(a)*this.speed;
			this.vector.y = Math.cos(a)*this.speed;
		}
		else {
			this.resetVector();
			this.targeting = false;
		}
	}
};

Object2D.prototype.resetVector = function() {
	this.vector = { x : 0, y : 0 };
};

Object2D.prototype.setTarget = function(x,y) {
	this.target.x = x;
	this.target.y = y;

	this.targeting = true;
};

Object2D.prototype.render = function(ctx) {

};

Object2D.prototype.tick = function() {

};