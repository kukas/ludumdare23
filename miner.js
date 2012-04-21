function Miner (x_c,y_c) {
	this.x=x_c;
	this.y=y_c;
	this.health=20;
	this.proces=false;
	this.width=35;
	this.height=20;
	this.maxvec=1;
	this.texture=new Image();
	this.texture.src="./Assets/miner.bmp";
	this.target=false;
	this.render = function (ctx) {
		this.move();
		ctx.save();
		ctx.rotate(this.rotation);
		ctx.translate(this.x,this.y);
		ctx.drawImage(this.texture, -this.width/2,-this.height/2,this.width,this.height);
		ctx.restore();
		
	};
	this.tick = function (){
		this.setTarget(game.objects[1].x,game.objects[1].y);
		this.goToTarget(game.objects[1].x,game.objects[1].y);
	};
};
Miner.prototype = new Object2D();