function GUI(ctx){
	this.texts = { };
	this.rectangles = { };
	this.buttons = { };

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
			ctx.fillText(this.text, this.x, this.y);
		};
	};
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
	};
	function Button(x,y,width,height,image,color,action){
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;

		this.color = color;
		this.image = new Image();
		this.image.src = image;
		this.action = action;

		this.pressed = false;

		this.draw = function( ctx ){
			if( this.pressed ){
				ctx.drawImage( this.image, this.x, this.y );
				ctx.strokeStyle = this.color;
				ctx.lineWidth = 1;
				ctx.strokeRect( this.x, this.y, this.width, this.height );
			}
			else {
				ctx.drawImage( this.image, this.x, this.y );
			}
		}
	};

	this.addText = function(name, text, x,y, font, color){
		font = font !== undefined ? font : "Arial 12pt";
		this.texts[ name ] = new Text(text, x,y, font, color);
	};
	this.changeText = function(name, text){
		if(!this.texts[ name ]) console.log("changeText -> neexistuje zadaný text")
		this.texts[ name ].text = text;
	};

	this.addRectangle = function(name, x,y, width,height, color){
		this.rectangles[ name ] = new Rectangle(x,y, width,height, color);
	};

	this.addButton = function(name, x,y, width,height, src,color, action){
		this.buttons[ name ] = new Button(x,y, width,height, src, color, action);
	};

	this.press = function(x,y){
		for( i in this.buttons ){
			this.buttons[i].pressed = false;
			if(x > this.buttons[i].x && y > this.buttons[i].y &&
				x < this.buttons[i].x+this.buttons[i].width && y < this.buttons[i].y+this.buttons[i].height){
				this.buttons[i].action();
				this.buttons[i].pressed = true;
			}
		}
	};

	this.render = function(){
		for(i in this.rectangles){
			this.rectangles[ i ].draw( ctx );
		}
		for(i in this.buttons){
			this.buttons[ i ].draw( ctx );
		}
		for(i in this.texts){
			this.texts[ i ].draw( ctx );
		}
	}
}