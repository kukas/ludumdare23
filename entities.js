function Warbot(x,y){
	this.x=x;
	this.y=y;
	this.health=20;
	this.target={x:0,y:0};
	this.vector={x:0,y:0};
	this.texture=new Animation(game.textures.image.warbot,3,5);
};
Warbot.prototype=new Nanobot();

function Builder(x,y){
	this.x=x;
	this.y=y;
	this.health=5;
	this.target={x:0,y:0};
	this.vector={x:0,y:0};
	this.texture= new Animation(game.textures.image.builder,4,1);
};
Builder.prototype=new Nanobot();

function Enginner(x,y){
	this.x=x;
	this.y=y;
	this.health=5;
	this.target={x:0,y:0};
	this.vector={x:0,y:0};
	this.texture=new Animation(game.textures.image.engineer,3,1);
};
Enginner.prototype=new Nanobot();

function Virus(x,y){
	this.health=5;
	this.x=x;
	this.y=y;
	
	this.target={x:0,y:0};
	this.vector={x:0,y:0};
	this.texture=new Animation(game.textures.image.virus,1,1);
	
	this.render = function(ctx) {
		this.texture.drawFrame(this.x-this.texture.width/2,this.y-this.texture.height/2,ctx);
	};
	this.radius=Math.sqrt(this.texture.width*this.texture.width+this.texture.height*this.texture.height)/2;
};
Virus.prototype=new AI();
