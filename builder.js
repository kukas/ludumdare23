function Builder(x,y) {
	
	this.x = x;
	this.y = y;
	
	this.health=100;
	this.proces=false;
	
	this.width=10;
	this.height=10;
	this.radius=20;
	// this.radius=20;
	this.rotation=0;
	
	this.texture=new Image();
	this.texture.src = "Assets/genetic enginner.png";

	this.controls = [
		"blabla"
	]
	
	this.target = { x:0, y:0 };
	
	this.onCollision = function (){console.log("Kolize");};
	
	this.render = function (ctx) {
		ctx.save();
		ctx.translate(this.x,this.y);

		dy = this.target.y - this.y;
		dx = this.target.x - this.x;
		
		var a = Math.atan( dy/dx );

		if(this.x > this.target.x){
			a += Math.PI;
			}

		this.rotation = a;
		
		ctx.rotate(this.rotation);
		ctx.scale(0.5,0.5)
		ctx.drawImage(this.texture, -this.texture.width/2,-this.texture.height/2);

		if(this.selected){
			ctx.strokeStyle = "rgb(20,20,120)";
			ctx.fillStyle = "rgba(20,20,120,0.2)";
			ctx.lineWidth = 2;
			ctx.strokeRect( -this.texture.width/2-5,-this.texture.height/2-10, this.texture.width+5,this.texture.height+20 );
			ctx.fillRect( -this.texture.width/2-5,-this.texture.height/2-10, this.texture.width+5,this.texture.height+20 );
		}

		ctx.restore();
	};
	this.tick = function(){
		this.goToTarget();
		this.move();
	}
};
Builder.prototype = new Object2D();