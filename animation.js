function Animation(src,frames,speed){
		
		this,speed=speed;
		this.frames=frames*speed;
		this.frame=0;
		
		this.zdroj=new Image();
		this.zdroj.src=src;
		this.width = this.zdroj.width/frames;
		this.height=this.zdroj.height;
		
		this.drawFrame = function (x,y,ctx) {
			ctx.drawImage(this.zdroj,Math.floor(this.frame)*this.width,0,this.width,this.zdroj.height, x,y,this.width,this.zdroj.height);
			if(this.frame < this.frames/speed-1){
				this.frame += 1/speed;
			}
			else{
				this.frame=0;
			}
		};
	};