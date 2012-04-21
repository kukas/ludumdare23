function Jukebox (){
	
	var _this=this;
	
	this.silence=new Audio();
	this.silence.src="./Assets/Silence.wav";
	
	this.loadSound = function (name, src){
		this[name]=new Audio();
		this[name].src=src;
		this[name].ambient = function (){
			_this.ambient=this;
		};
		this.playing=false;
	};
	
	this.play = function (name){
		this[name].play();
		this[name].playing=true;
	};
	
	this.stop = function (name) {
			var src = this[name].src;
			this[name].src=this.silence.src;
			this[name].playing=false;
			this[name].src=src;
	};
	
	this.ambient=false;
	this.ambient.playing=false;
	
	this.render = function () {
		if(this.ambient && !this.ambient.playing){
				_this.play("ambient");
			}
		else if(this.ambient && this.ambient.played.length){
				_this.ambient.played.length=0;
				_this.ambient.playing=false;
			}
	};
};