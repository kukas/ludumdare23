function Miner () {
	this.health=20;
	this.proces=false;
	this.vector=[0,0];
	this.maxvec=10;
	this.texture=new Image();
	this.texture.src="miner.bmp";
	this.mine = function (obj){
		this.x-obj.x > 0 ? this.vector[0]-=this.maxvec : (this.x-obj.x==0 ? this.vector[0]=0 : this.vector[0]+=this.maxvec);
		
	};
	this.render = function (ctx) {
		this.move();
		ctx.drawImage(this.texture, this.x,this.y,this.width,this.height)
	};
};
Miner.prototype = new Object2D();