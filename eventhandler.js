function Eventhandler( dom ) {
	var _this = this;
	// ---------------------------------------------------------------------------
	// keycode : new Key( funkce_keydown, funkce_keyup, true=koná keydown dokud je klávesa stisknutá false=vykoná jednou )
	this.controls = {
		17 : new Key(false),
		32 : new Key( function(){ console.log("mezerník") }, false, "keydown" ),
		73 : new Key ( function (){ game.objects[1].vector={x:0,y:0};game.objects[1].vector.y--; }),
		74 : new Key ( function (){ game.objects[1].vector={x:0,y:0};game.objects[1].vector.x--; }),
		75 : new Key ( function (){ game.objects[1].vector={x:0,y:0};game.objects[1].vector.y++; }),
		76 : new Key ( function (){ game.objects[1].vector={x:0,y:0};game.objects[1].vector.x++; }),
	};
	// 1 = levé tl, 2 = prostřední, 3 = pravé, 0 = pohyb
	// new Key( funkce_mousedown, funkce_mouseup, true=koná mousedown dokud je tlačítko stisknuté false=vykoná jednou )
	this.mouseControls = {
		1 : new Mouse( 
			function(){ 
				game.selector.beginSelect( _this.mouse.x, _this.mouse.y ); 
			}, 
			function( type ){ 
				if(game.selector.rectangle.width == 0 && game.selector.rectangle.height == 0){
					console.log("Prov�d�m");
					if (_this.controls[17].down){
						game.inObjects(_this.mouse.x,_this.mouse.y).selected=true;
					}
					else{
						for(i in game.objects){
							if(game.inObjects(_this.mouse.x,_this.mouse.y).x==game.objects[i].x && game.inObjects(_this.mouse.x,_this.mouse.y).y==game.objects[i].y){
								game.clearSelected();
								game.objects[i].selected=true;
								return true;
							}
							else{
								game.clearSelected();
							};
						};
					};
				}
				else{
					game.selectObjects();
					game.selector.closeSelect();
				};
			}, 
			function( type ){ 
				game.selector.moveSelect( _this.mouse.x, _this.mouse.y ); 
			} ),
		3 : new Mouse(
			function(){ 
				game.targetObjects( _this.mouse.x, _this.mouse.y );
				 }
			)
	}
	// ---------------------------------------------------------------------------

	function Key(keydown, keyup, continuous) {
		this.keydown = keydown === undefined ? false : keydown;
		this.keyup = keyup === undefined ? false : keyup;
		this.continuous = continuous === undefined ? false : continuous;
		this.down = false;
	};

	function Mouse(mousedown, mouseup, continuous) {
		this.mousedown = mousedown === undefined ? false : mousedown;
		this.mouseup = mouseup === undefined ? false : mouseup;
		this.continuous = continuous === undefined ? false : continuous;
		this.down = false;
	};

	this.dom = dom;

	this.mouse = { x:0, y:0 };

	document.body.addEventListener( "keydown", function(ev){ _this.keyboard(ev); }, true );
	document.body.addEventListener( "keyup", function(ev){ _this.keyboard(ev); }, true );

	this.dom.addEventListener( "mousemove", function(ev){ _this.mousehandler(ev); }, true );
	this.dom.addEventListener( "mousedown", function(ev){ _this.mousehandler(ev); }, true );
	this.dom.addEventListener( "mouseup", function(ev){ _this.mousehandler(ev); }, true );
	this.dom.addEventListener( "contextmenu", function(ev){ ev.preventDefault() }, true );
	// případně jde vytáhnout do nějakého tick loopu.
	setInterval( function(){ _this.loop(); }, 50 );
}

Eventhandler.prototype.keyboard = function(e) {
	var keycode = e.keyCode,
		type = e.type;
	if( this.controls[ keycode ] ){
		
		this.controls[ keycode ].down = (type == "keydown");
		
		if( this.controls[ keycode ][ type ] ){
			this.controls[ keycode ][ type ]();
		}
	}
	else{
		console.log([type,keycode])
	}
}

Eventhandler.prototype.mousehandler = function(e) {
	var which = e.which,
		type = e.type;
	this.mouse.x = e.pageX - this.dom.offsetLeft;
	this.mouse.y = e.pageY - this.dom.offsetTop;

	if( this.mouseControls[ which ] ){

		this.mouseControls[ which ].down = (type != "mouseup");
		
		if( this.mouseControls[ which ][ type ] ){
			this.mouseControls[ which ][ type ]( type )
		}
	}
	// else{
	// 	console.log([which,type])
	// }
	e.preventDefault();
};

Eventhandler.prototype.loop = function() {
	for(k in this.controls){
		if( this.controls[ k ].down && this.controls[ k ].continuous ){
			this.controls[ k ].continuous();
		}
	}
	for(m in this.mouseControls){
		if( this.mouseControls[ m ].down && this.mouseControls[ m ].continuous ){
			this.mouseControls[ m ].continuous("loop");
		}
	}
}