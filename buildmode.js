function Buildmode(){
	this.builder;
	this.building;
	this.enabled = false;
	this.enable = function( builder, building ){
		this.enabled = true;
		this.builder = builder;
		this.building = building;
	}
	this.disable = function( builder, building ){
		this.enabled = false;
		this.builder = builder;
		this.building = building;
	}
}