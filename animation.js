function Animation(image,frames,speed){
		
		this.speed=speed;
		this.frame=0;
		
		this.zdroj=image;
		this.width = this.zdroj.width/frames;
		this.height=this.zdroj.height;
		this.frames=frames*speed;
		
		this.drawFrame = function (x,y,ctx) {
			ctx.drawImage(this.zdroj,Math.floor(this.frame)*this.width,0,this.width,this.zdroj.height, x,y,this.width,this.zdroj.height);
			if(this.frame < this.frames/this.speed-1){
				this.frame += 1/this.speed;
			}
			else{
				this.frame=0;
			}
		};
	};