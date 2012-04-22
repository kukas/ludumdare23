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

	var c = game.findCollisions( this );
	if(c){
		this.x -= this.vector.x;
		this.y -= this.vector.y;
		
		function preklopeni(vec,uhel){
			var rad = Math.sqrt(vec.x*vec.x+vec.y*vec.y);
		if(vec.x!=0){
			var a=Math.atan(vec.y/vec.x);
			uhel+=a;
			vec.x=Math.cos(uhel)*rad;
			vec.y=Math.sin(uhel)*rad;
		};
		
		if (c.y-this.vector.y>0){
			preklopeni(this.vector,-Math.PI/2);
		}
		else{
			preklopeni(this.vector,Math.PI/2);
		}
		
		this.x += this.vector.x;
		this.y += this.vector.y;
		
		/*if(this.vector.y > 0){
			this.vector.x=this.vector.x*(Math.cos(this.radius/(this.radius+c.radius)));
			this.vector.y=this.vector.y*(Math.sin(this.radius/(this.r
				if(this.y > this.target.y){adius+c.radius)));
			var a = Math.atan(this.vector.x/this.vector.y);
					a += Math.PI;
				}
			this.rotation=a;
			this.x += this.vector.x;
			this.y += this.vector.y;
		}
		else if (this.vector.y == 0){
			var b = Math.cos(c.radius/(c.radius.this.radius));
			
		}
		else{
			return false;
		}*/
	};
	}
};

Object2D.prototype.accelerate = function(vec) {
	this.vector.x += vec.x;
	this.vector.y += vec.x;
};

Object2D.prototype.goToTarget = function() {
	if(this.targeting){
		var dy = this.target.y - this.y;
		var dx = this.target.x - this.x;
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