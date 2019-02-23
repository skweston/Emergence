//fixed neighbors
var AM = new AssetManager();
var CELLS = 10;

function Cell(game, x, y, xNum, yNum) {
    this.game = game;
    this.ctx = this.game.ctx;

    this.column = xNum;
    this.row = yNum;
    this.name = this.column + " x " + this.row;
    this.x = x;
    this.y = y;
    console.log("x: " + this.x + " y: " + this.y);

    //this.currentState = false;
    //this.nextState = false;
    this.alive = false;

    this.neighbors = [];

    Entity.call(this, game, this.x, this.y);
}

Cell.prototype.findMyNeighbors = function () {
    //this needs to be adjusted for larger maps
    //console.log("me: " + this.name);
    for(var i = 0; i < this.game.entities.length; i++) {
        var ent = this.game.entities[i];
        //console.log("checking: " + ent.name);

        if(ent.column === this.column - 1) {
            if(ent.row === this.row - 1) {
                this.neighbors.push(ent);
                //console.log("found TL neighbor");
            }

            if(ent.row === this.row) {
                this.neighbors.push(ent);
                //console.log("found T neighbor");
            }

            if(ent.row === this.row + 1) {
                this.neighbors.push(ent);
                //console.log("found TR neighbor");
            }
        }

        if(ent.column === this.column) {
            if(ent.row === this.row - 1) {
                this.neighbors.push(ent);
                //console.log("found L neighbor");
            }

            //missing this cell

            if(ent.row === this.row + 1) {
                this.neighbors.push(ent);
                //console.log("found R neighbor");
            }
        }

        if(ent.column === this.column + 1) {
            if(ent.row === this.row - 1) {
                this.neighbors.push(ent);
                //console.log("found BL neighbor");
            }

            if(ent.row === this.row) {
                this.neighbors.push(ent);
                //console.log("found B neighbor");
            }

            if(ent.row === this.row + 1) {
                this.neighbors.push(ent);
                //console.log("found BR neighbor");
            }
        }
    }

    //console.log("me: " + this.name);
    //console.log("my neighbors:");
    /*for(var i = 0; i < this.neighbors.length; i++) {
        console.log(i + " " + this.neighbors[i].name);
    }*/
}

Cell.prototype.checkMyNeighbors = function () {
    //console.log("neighbor check");
    var living = 0;

    //console.log("me: " + this.name);
    for(var i = 0; i < this.neighbors.length; i++) {
        //console.log("#ofNeighbors = " + this.neighbors.length);
        var ent = this.neighbors[i];
        //console.log("neighbor: " + ent.name);
        //console.log("neighbor state: " + ent.currentState);
        //console.log("neighbor state: " + this.neighbors[i].currentState);
        /*if(this.neighbors[i].currentState === true) {
            //console.log("found alive");
            alive++;
        }*/
        if(this.neighbors[i].alive == true) {
        	living++
        }
    }

    return living;
}

Cell.prototype.update = function () {
    var living = this.checkMyNeighbors();
    console.log("living: " + living);
    if(living === 0 || living === 1) {
        this.alive = false;
    }
    if(living === 2) {
        this.alive = true;
    }
    if(living === 3) {
        this.alive = true;
    }
    if(living > 3) {
        this.alive = false; 
    }

    Entity.prototype.update.call(this);
}

Cell.prototype.draw = function () {
    if(this.alive) {
        this.ctx.fillStyle = 'black';
    } else {
        this.ctx.fillStyle = 'white';
    }
    
    this.ctx.fillRect(this.x, this.y, this.game.ctx.canvas.width/CELLS, this.game.ctx.canvas.height/CELLS);

    Entity.prototype.draw.call(this);
}


function Glider(game) {
    //console.log("glider");
    this.game = game;

    this.anchorX = Math.floor(CELLS/2);
    this.anchorY = Math.floor(CELLS/2);

    this.cells = [];

    this.setUp();
    
}

Glider.prototype.setUp = function () {
    for(var i = 0; i < this.game.entities.length; i++) {
        var ent = this.game.entities[i];
        //console.log("ent.name: " + ent.name);
        var cell1 = (this.anchorX) + " x " + (this.anchorY - 1);
        //console.log("cell1 " + cell1);
        var cell2 = (this.anchorX + 1) + " x " + (this.anchorY);
        //console.log("cell2 " + cell2);
        var cell3 = (this.anchorX - 1) + " x " + (this.anchorY + 1);
        //console.log("cell3 " + cell3);
        var cell4 = (this.anchorX) + " x " + (this.anchorY + 1);
        //console.log("cell4 " + cell4);
        var cell5 = (this.anchorX + 1) + " x " + (this.anchorY + 1);
        //console.log("cell5 " + cell5);

        if(ent.name === cell1) {
            this.cells.push(ent);
            ent.alive = true;
        }
        if(ent.name === cell2) {
            this.cells.push(ent);
            ent.alive = true;
        }
        if(ent.name === cell3) {
            this.cells.push(ent);
            ent.alive = true;
        }
        if(ent.name === cell4) {
            this.cells.push(ent);
            ent.alive = true;
        }
        if(ent.name === cell5) {
            this.cells.push(ent);
            ent.alive = true;
        }
    }
}

function Blinker(game) {
	//console.log("blinker");
    this.game = game;

    //this.anchorX = Math.floor(CELLS/2) - 1;
    //this.anchorY = Math.floor(CELLS/2) - 1;
    this.anchorX = 1;
    this.anchorY = 1;

    this.cells = [];

    this.setUp();
}

Blinker.prototype.setUp = function () {
    for(var i = 0; i < this.game.entities.length; i++) {
        var ent = this.game.entities[i];
        //console.log("ent.name: " + ent.name);
        var cell1 = (this.anchorX) + " x " + (this.anchorY - 1);
        //console.log("cell1 " + cell1);
        var cell2 = (this.anchorX) + " x " + (this.anchorY);
        //console.log("cell2 " + cell2);
        var cell3 = (this.anchorX) + " x " + (this.anchorY + 1);
        //console.log("cell3 " + cell3);

        if(ent.name === cell1) {
            this.cells.push(ent);
            ent.alive = true;
        }
        if(ent.name === cell2) {
            this.cells.push(ent);
            ent.alive = true;
        }
        if(ent.name === cell3) {
            this.cells.push(ent);
            ent.alive = true;
        }
    }
}

AM.queueDownload("./images/Link3.png");

AM.downloadAll(function () {
    var canvas = document.getElementById("gameWorld");
    console.log(canvas);
    var ctx = canvas.getContext("2d");

    var gameEngine = new GameEngine();
    gameEngine.init(ctx);
    gameEngine.start();

    //var cells = 8; //will be squared
    var x = 0;
    var y = 0;
    var square = 35;

    for(var i = 0; i < CELLS; i++) {
        y = 0;
        for(var j = 0; j < CELLS; j++) {
            gameEngine.addEntity(new Cell(gameEngine, ctx.canvas.width/CELLS * i, ctx.canvas.height/CELLS * j, i, j));
            y += square;
        }

        x += square;
    }

    for(var i = 0; i < gameEngine.entities.length; i++) {
        gameEngine.entities[i].findMyNeighbors();
    }

    //gameEngine.seed = new Glider(gameEngine);
    gameEngine.seed = new Blinker(gameEngine);
    //console.log("seed: " + gameEngine.seed);

    console.log("All Done!");

});