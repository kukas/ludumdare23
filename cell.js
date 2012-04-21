function Cell(x,y){
	this.x = x;
	this.y = y;

	this.background = new Image();
	this.background.src = "Assets/bunka-pozadi.png";

	this.vector = { x:0,y:0 };

	this.organely = {
		jadro : { x:0, y:0,distance:0, width:30, height:30, src:"Assets/nucleus.png" },
		mitochondrie1 : { distance:40, angle:Math.random()*Math.PI*2, x:0, y:0, width:10, height:10 },
		mitochondrie2 : { distance:35, angle:Math.random()*Math.PI*2, x:0, y:0, width:10, height:10 },
		mitochondrie3 : { distance:45, angle:Math.random()*Math.PI*2, x:0, y:0, width:10, height:10 },

		retikulum : { x:0, y:20,distance:20, width:30, height:30 },
	};

	var max = 0;
	for(var i in this.organely){
		var d = this.organely[i].distance + Math.sqrt(this.organely[i].width*this.organely[i].width/4+this.organely[i].height*this.organely[i].height/4);
		if(max < d){
			max = d;
		}
	}
	console.log(max)
	this.radius = max;
	this.width=2*this.radius;
	this.height=2*this.radius;

	this.load = function(){
		for(i in this.organely){
			this.organely[i].image = new Image();
			this.organely[i].image.src = this.organely[i].src;
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
			//ctx.fillRect(this.organely[i].x - this.organely[i].width/2, this.organely[i].y - this.organely[i].height/2, this.organely[i].width,this.organely[i].height);
			if(this.organely[i].image) ctx.drawImage(this.organely[i].image,this.organely[i].x - this.organely[i].image.width/2, this.organely[i].y - this.organely[i].image.height/2)
		}
		ctx.restore();
	};
	this.moveOrganely = function(){
		for(var i in this.organely){
			if( this.organely[i].distance !== undefined && this.organely[i].angle !== undefined ){
				this.organely[i].angle+=Math.PI/180;
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