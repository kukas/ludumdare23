function Organela(distance,speed,image){
	this.x = 0;
	this.y = 0;
	this.distance = distance;
	this.speed = speed;
	this.angle = Math.random()*Math.PI*2;
	this.image = image;
}
function Cell(x,y){
	this.x = x;
	this.y = y;

	this.speed = 1;

	this.background = game.textures.image.cellPlasma;

	this.vector = { x:0,y:0 };

	this.organely = {
		jadro : new Organela(0,0,new Animation(game.textures.image.cellNucleus,1,1)),
		mitochondrie1 : new Organela( 50,Math.random()/500,new Animation(game.textures.image.cellMitochondrie,1,1) ),
		mitochondrie2 : new Organela( 70,Math.random()/500,new Animation(game.textures.image.cellMitochondrie,1,1) ),
		mitochondrie3 : new Organela( 80,Math.random()/500,new Animation(game.textures.image.cellMitochondrie,1,1) ),
		mitochondrie4 : new Organela( 60,Math.random()/500,new Animation(game.textures.image.cellMitochondrie,1,1) ),
		mitochondrie5 : new Organela( 75,Math.random()/500,new Animation(game.textures.image.cellMitochondrie,1,1) ),
		mitochondrie6 : new Organela( 85,Math.random()/500,new Animation(game.textures.image.cellMitochondrie,1,1) ),
		// retikulum : { x:0, y:55,distance:20, width:30, height:30 },
	};

	var max = 0;
	for(var i in this.organely){
		var d = this.organely[i].distance;
		if(max < d){
			max = d;
		}
	}
	this.radius = max + 10;
	this.width=2*this.radius;
	this.height=2*this.radius;

	this.build = function(co, misto_ceho){
		for(i in co){
			this.organely[misto_ceho][i] = co[i];
		}
	}

	this.render = function(ctx){
		//ctx.strokeRect(this.x, this.y, 10,10);
		var b = ctx.createPattern( this.background, "repeat" );
		ctx.fillStyle = b;
		ctx.strokeStyle = "#222";
		ctx.beginPath();
		ctx.arc(this.x, this.y, this.radius	, 0, Math.PI*2);
		ctx.fill();
		ctx.stroke();
		ctx.closePath();
		if(this.selected) ctx.fillStyle = "green";
		else ctx.fillStyle = "red";
		ctx.save();
		ctx.translate(this.x,this.y);
		for(var i in this.organely){
			var x = this.organely[i].x - this.organely[i].image.width/2;
			var y = this.organely[i].y - this.organely[i].image.height/2;
			this.organely[i].image.drawFrame(x,y,ctx)
		}
		ctx.restore();

		if(this.selected){
			ctx.strokeStyle = "rgb(20,20,120)";
			ctx.fillStyle = "rgba(20,20,120,0.2)";
			ctx.beginPath();
			ctx.arc(this.x,this.y,this.radius+5, 0, Math.PI*2);
			ctx.fill();
			ctx.stroke();
			ctx.closePath()
		}
	};
	this.moveOrganely = function(){
		for(var i in this.organely){
			if( this.organely[i].distance !== undefined && this.organely[i].angle !== undefined ){
				this.organely[i].angle += this.organely[i].speed;
				//this.organely[i].distance+=(Math.random()-0.5);
				this.organely[i].x = Math.sin( this.organely[i].angle )*this.organely[i].distance
				this.organely[i].y = Math.cos( this.organely[i].angle )*this.organely[i].distance
			}
		}
	}
	this.tick = function(){
		//this.goToTarget();
		//this.move();

		this.moveOrganely();
	}
}

Cell.prototype = new Object2D();