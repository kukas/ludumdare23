function Textures(){
	this.src = {
		cellPlasma : "Assets/plasma.png",
		cellNucleus : "Assets/nucleus.png",
		cellMitochondrie : "Assets/mit.png",
		cellBarracks : "Assets/barracks.png",
		cellHQ : "Assets/headquarters.png",
		cellAugument : "Assets/nucleus agument.PNG",
		// cellMitochondrie : "Assets/mit.png",

		builder : "Assets/builder/builder.png",
		warbot : "Assets/warbot/warbot.png",
		engineer : "Assets/genetic engineer/engineer.png",
		background1 : "Assets/background1.png",
		background2 : "Assets/background2.png",
		background3 : "Assets/background3.png",
		background4 : "Assets/background4.png",
		tlacitkoKasarna : "Assets/tlacitko_kasarna.png",
		tlacitkoTovarna : "Assets/tlacitko_tovarna.png",
		virus : "Assets/virus.PNG",

	};
	this.image = { };
	for(i in this.src){
		this.image[ i ] = new Image();
	};

	// počet položek v objektu
	this.pocetTextur = Object.keys(this.src).length;

	var _this = this;

	this.load = function( callback ){
		for(i in this.src){
			if(!this.image[ i ]) this.image[ i ] = new Image();
			this.image[ i ].onload = function(){
				_this.pocetTextur--;
				if( _this.pocetTextur === 0 ){
					callback();
				}
			}
			this.image[ i ].src = this.src[ i ];
		}
	}
}