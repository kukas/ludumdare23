function Miner (x_c,y_c) {
	this.x=x_c;
	this.y=y_c;
	this.health=20;
	this.proces=false;
	this.width=20;
	this.height=20;
	this.maxvec=1;
	this.texture=new Image();
	this.texture.src="./Assets/miner.bmp";
	this.target=0;
	this.mine = function (obj){
		if(obj){
			if(obj.x==this.x && obj.y==this.y){
				this.vector={x:0,y:0};
			}
			if(obj.x==this.x && obj.y!=this.y){
				if(obj.y-this.y > 0){
					this.vector.y=this.maxvec;
				}
				if(obj.y-this.y < 0){
					this.vector.y=-this.maxvec;
				}
			}
			if(obj.x!=this.x && obj.y == this.y){
				if(obj.x-this.x > 0){
					this.vector.x=this.maxvec;
				}
				if(obj.x-this.x < 0){
					this.vector.x=-this.maxvec;
				}
			}
			else if(obj.x!=this.x && obj.y!= this.y){
				if(obj.x-this.x > 0){
					this.vector.x=this.maxvec;
				}
				if(obj.x-this.x < 0){
					this.vector.x=-this.maxvec;
				}
				if(obj.y-this.y > 0){
					this.vector.y=this.maxvec;
				}
				if(obj.y-this.y < 0){
					this.vector.y=-this.maxvec;
				}
			}
		}
		else{ return false; }
	};
	this.render = function (ctx) {
		this.move();
		ctx.drawImage(this.texture, this.x,this.y,this.width,this.height);
		
	};
	this.tick = function (){
		this.target={x:game.objects[0].x,y:game.objects[0].y};
		if(this.target){
			this.mine(this.target);
		}
	};
};
Miner.prototype = new Object2D();