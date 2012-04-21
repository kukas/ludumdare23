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
	
	this.target = { x:0, y:0 };
	
	this.render = function (ctx) {
		this.move();
		ctx.save();
		ctx.translate(this.x,this.y);
		if(this.vector.x!=0){
			ctx.rotate(Math.atan(this.vector.y/this.vector.x));
		}
		else if (this.vector.x==0 && this.vector.y!=0){
			this.vector.y < 0 ? ctx.rotate(-Math.PI/2) : ctx.rotate(Math.PI/2);
		};
		ctx.drawImage(this.texture, -this.width/2,-this.height/2,this.width,this.height);
		ctx.restore();
	};
	this.tick = function (){
		for(i in game.objects){
			if(game.objects[i]!=this){
				if(game.colliding(this,game.objects[i])){
					this.vector={x:0,y:0};
				};	
			}
		};
	};
};
Miner.prototype = new Object2D();