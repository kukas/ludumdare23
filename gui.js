function GUI(ctx){
	this.texts = { };
	this.ctx = ctx;

	function Text(text, x,y, font, color){
		this.text = text;
		this.x = x;
		this.y = y;
		this.font = font;
		this.color = color;

		this.draw = function( ctx ){
			ctx.fillStyle = this.color;
			ctx.font = this.font;
			ctx.fillText(this.text, this.x - ctx.measureText(this.text).width/2, this.y);
		};
	}
	function Rectangle(x,y,width,height,color){
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;

		this.color = color

		this.draw = function( ctx ){
			ctx.fillStyle = color;
			ctx.fillRect( this.x, this.y, this.width, this.height );
		}
	}

	this.addText = function(name, text, x,y, font, color){
		font = font !== undefined ? font : "Arial 12pt";
		this.texts[ name ] = new Text(text, x,y, font, color);
	}

	this.render = function(){
		for(i in this.texts){
			this.texts[ i ].draw( ctx );
		}
	}
}