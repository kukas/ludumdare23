function Miner (x_c,y_c) {
	this.x=x_c;
	this.y=y_c;
	this.health=20;
	this.proces=false;
	this.width=20;
	this.height=20;
	this.maxvec=10;
	this.texture=new Image();
	this.texture.src="./Assets/miner.bmp";
	this.target=0;
	this.mine = function (obj){
		if(obj){
			if(this.x==obj.x || this.y==obj.y){
				this.vector={x:0,y:0};
			}
			else{
			this.x-obj.x > 0 ? this.vector.x-=this.maxvec : (this.x-obj.x==0 ? this.vector.x=0 : this.vector.x+=this.maxvec);
			this.y-obj.y > 0 ? this.vector.y-=this.maxvec : (this.y-obj.y==0 ? this.vector.y=0 : this.vector.y+=this.maxvec);
			};
		}
		else{ return false; }
	};
	this.render = function (ctx) {
		this.move();
		ctx.drawImage(this.texture, this.x,this.y,this.width,this.height)
	};
	this.tick = function (){
		if(this.target){
			this.goToTarget();
		}
	};
};
Miner.prototype = new Object2D();