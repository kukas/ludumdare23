function Miner (x_c,y_c,src,health) {
	
	this.x=x_c;
	this.y=y_c;
	
	this.health=health;
	this.proces=false;
	
	this.width=130;
	this.height=53;
	this.radius=Math.sqrt(this.width*this.width+this.height*this.height)/2.4;
	this.maxvec=1;
	this.rotation=0;
	
	this.texture=new Image();
	this.texture.src=src;
	
	this.target = { x:0, y:0 };
	
	this.onCollision = function (){console.log("Kolize");};
	
	this.render = function (ctx) {
		this.move();
		ctx.save();
		ctx.translate(this.x,this.y);
		ctx.rotate(this.rotation);
		if(this.vector.x!=0){
			if(this.vector.x<0){
				ctx.rotate(Math.PI-Math.atan(this.vector.y/this.vector.x));
			}
			else{
				ctx.rotate(Math.atan(this.vector.y/this.vector.x));
			};
		}
		else if (this.vector.x==0 && this.vector.y!=0){
			this.vector.y < 0 ? ctx.rotate(-Math.PI/2) : ctx.rotate(Math.PI/2);
		};
		ctx.drawImage(this.texture, -this.width/2,-this.height/2,this.width,this.height);
		ctx.closePath();
		ctx.restore();
		/*ctx.beginPath();
		ctx.arc(this.x+4,this.y,this.radius,0,2*Math.PI,true);
		ctx.strokeStyle="black";
		ctx.stroke();*/
	};
	this.tick = function (){
		for(i in game.objects){
			if(game.objects[i]!=this){
				if(game.colliding(this,game.objects[i])){
					if(this.onCollision!="undefined"){
						this.onCollision();
						if(this.vector.x!=0){
							this.rotation=0;
							this.vector={x:0,y:0};
						}
						else{
							this.y < 0 ? this.rotation=-Math.PI/2 : this.rotation=Math.PI/2;
							this.vector={x:0,y:0};
						};
					}
					else{
						this.rotation=Math.atan(this.vector.y/this.vector.x);
						this.vector={x:0,y:0};
					};
				};	
			}
		};
	};
};
Miner.prototype = new Object2D();