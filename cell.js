function Cell(x,y){
	this.x = x;
	this.y = y;

	this.vector = { x:0.5,y:0 };

	this.organely = {
		jadro : { x:0, y:0, width:30, height:30 },
		mitochondrie1 : { distance:40, angle:Math.random()*Math.PI*2, x:0, y:0, width:10, height:10 },
		mitochondrie2 : { distance:35, angle:Math.random()*Math.PI*2, x:0, y:0, width:10, height:10 },
		mitochondrie3 : { distance:45, angle:Math.random()*Math.PI*2, x:0, y:0, width:10, height:10 },

		retikulum : { x:0, y:20, width:30, height:30 },
	};

	this.render = function(ctx){
		if(this.selected) ctx.strokeStyle = "green";
		else ctx.strokeStyle = "red";
		//ctx.strokeRect(this.x, this.y, 10,10);
		ctx.save();
		ctx.translate(this.x,this.y);
		for(var i in this.organely){
			ctx.fillRect(this.organely[i].x - this.organely[i].width/2, this.organely[i].y - this.organely[i].height/2, this.organely[i].width,this.organely[i].height);
		}
		ctx.restore();
	};
	this.moveOrganely = function(){
		for(var i in this.organely){
			if( this.organely[i].distance !== undefined && this.organely[i].angle !== undefined ){
				this.organely[i].angle+=Math.PI/180;
				this.organely[i].distance+=(Math.random()-0.5);
				this.organely[i].x = Math.sin( this.organely[i].angle )*this.organely[i].distance
				this.organely[i].y = Math.cos( this.organely[i].angle )*this.organely[i].distance
			}
		}
	}
	this.tick = function(){
		this.move();

		this.moveOrganely();
	}
}

Cell.prototype = new Object2D();