function Level(){
	this.prvni = [
		new Cell(100,100),
		new Cell(200,100),
		new Cell(100,200),
		new Cell(200,200),
		new Cell(300,300),
		new Miner(150, 30)
	]
};
level= new Level();