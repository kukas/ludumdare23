function AI(){
	this.target={x:0,y:0};
	function Radar(rad,par){
		this.radius=rad;
		this.x=par.x;
		this.y=par.y;
	};
	this.radar=new Radar(300,this);
	this.nearCells = function (){
		return game.findCollisions(this.radar);
	};
	
	this.tick = function (){
		var c = this.nearCells();
		if(this.nearCells()){
			this.setTarget(c.x,c.y);
			this.goToTarget();
			this.move();
		}
	};
};
AI.prototype=new Object2D();