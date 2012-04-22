function Warbot(x,y){
	this.x=x;
	this.y=y;
	this.health=20;
	this.target={x:0,y:0};
	this.vector={x:0,y:0};
	this.texture=new Animation(game.textures.image.warbot,3,5);
	this.menu = [];
};
Warbot.prototype=new Nanobot();

function Builder(x,y){
	this.x=x;
	this.y=y;
	this.health=5;
	this.target={x:0,y:0};
	this.vector={x:0,y:0};
	this.texture= new Animation(game.textures.image.builder,4,1);
	this.menu = [
		{ image : game.textures.image.tlacitkoTovarna },
		{ image : game.textures.image.tlacitkoKasarna },
	];
};
Builder.prototype=new Nanobot();

function Engineer(x,y){
	this.x=x;
	this.y=y;
	this.health=5;
	this.target={x:0,y:0};
	this.vector={x:0,y:0};
	this.texture=new Animation(game.textures.image.engineer,3,1);
	this.menu = [];
};
Engineer.prototype=new Nanobot();
