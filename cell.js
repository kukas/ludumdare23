function Cell(x,y){
	this.x = x;
	this.y = y;

	this.background = new Image();
	this.background.src = "Assets/bunka-pozadi.png";

	this.vector = { x:0,y:0 };

	this.organely = {
		jadro : { x:0, y:0,distance:0, width:30, height:30, src:"Assets/nucleus.png" },
		mitochondrie1 : { distance:70, angle:Math.random()*Math.PI*2, x:0, y:0, width:10, height:10, src:"Assets/mit.png" },
		mitochondrie2 : { distance:60, angle:Math.random()*Math.PI*2, x:0, y:0, width:10, height:10, src:"Assets/mit.png" },
		mitochondrie3 : { distance:80, angle:Math.random()*Math.PI*2, x:0, y:0, width:10, height:10, src:"Assets/mit.png" },

		retikulum : { x:0, y:55,distance:20, width:30, height:30 },
	};

	var max = 0;
	for(var i in this.organely){
		var d = this.organely[i].distance + Math.sqrt(this.organely[i].width*this.organely[i].width/4+this.organely[i].height*this.organely[i].height/4);
		if(max < d){
			max = d;
		}
	}
	this.radius = max;
	this.width=2*this.radius;
	this.height=2*this.radius;

	this.load = function(){
		for(i in this.organely){
			if(this.organely[i].src){
				this.organely[i].image = new Image();
				this.organely[i].image.src = this.organely[i].src;
			}
		}
	}

	this.load();

	this.render = function(ctx){
		//ctx.strokeRect(this.x, this.y, 10,10);
		var b = ctx.createPattern( this.background, "repeat" );
		ctx.fillStyle = b;
		ctx.beginPath();
		ctx.arc(this.x, this.y, this.radius	, 0, Math.PI*2);
		ctx.fill();
		//ctx.stroke();
		ctx.closePath();
		if(this.selected) ctx.fillStyle = "green";
		else ctx.fillStyle = "red";
		ctx.save();
		ctx.translate(this.x,this.y);
		for(var i in this.organely){
			if(this.organely[i].image) ctx.drawImage(this.organely[i].image,this.organely[i].x - this.organely[i].image.width/2, this.organely[i].y - this.organely[i].image.height/2)
			else ctx.fillRect(this.organely[i].x - this.organely[i].width/2, this.organely[i].y - this.organely[i].height/2, this.organely[i].width,this.organely[i].height);
		}
		ctx.restore();
	};
	this.moveOrganely = function(){
		for(var i in this.organely){
			if( this.organely[i].distance !== undefined && this.organely[i].angle !== undefined ){
				this.organely[i].angle+=Math.PI/1800;
				//this.organely[i].distance+=(Math.random()-0.5);
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