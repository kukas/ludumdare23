function Textures(){
	this.src = {
		cellPlasma : "Assets/plasma.png",
		cellNucleus : "Assets/nucleus.png",
		cellMitochondrie : "Assets/mit.png",
		cellMitochondrie : "Assets/mit.png",
	}
	this.image = {}

	this.load = function(){
		var pocetTextur = this.src.length;
		for(i in this.src){
			this.image[ i ] = new Image();
			this.image[ i ].onload = function(){

			}
			this.image[ i ].src = this.src[ i ];
		}
	}

	setInterval( function(){ game.render(); game.tick(); }, 1000/60 );
}