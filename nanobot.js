function Nanobot() {
	this.proces=false;
	
	this.width=10;
	this.height=10;
	this.radius=20;
	this.rotation=0;

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
		this.texture.drawFrame(-this.texture.width/2,-this.texture.height/2,ctx);

		if(this.selected){
			ctx.strokeStyle = "rgb(20,20,120)";
			ctx.fillStyle = "rgba(20,20,120,0.2)";
			ctx.lineWidth = 2;
			ctx.strokeRect( -this.texture.width/2-5,-this.texture.height/2-5, this.texture.width+10,this.texture.height+10 );
			ctx.fillRect( -this.texture.width/2-5,-this.texture.height/2-5, this.texture.width+10,this.texture.height+10 );
		}

		ctx.restore();
	};
	this.tick = function(){
		this.goToTarget();
		this.move();
	}
};
Nanobot.prototype = new Object2D();