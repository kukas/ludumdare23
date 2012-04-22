function Warbot(x,y){
	this.x=x;
	this.y=y;
	this.health=20;
	this.target={x:0,y:0};
	this.vector={x:0,y:0};
	this.texture=new Animation("Assets/warbot/warbot.png",3,5);
};
Warbot.prototype=new Nanobot();

function Builder(x,y){
	this.x=x;
	this.y=y;
	this.health=5;
	this.target={x:0,y:0};
	this.vector={x:0,y:0};
	this.texture= new Animation("Assets/builder/builder.png",4,1)
};
Builder.prototype=new Nanobot();

function Enginner(x,y){
	this.x=x;
	this.y=y;
	this.health=5;
	this.target={x:0,y:0};
	this.vector={x:0,y:0};
	this.texture=new Animation("Assets/enginner.png",3,1);
};
Enginner.prototype=new Nanobot();
