function Board(game, seed, cells) {
    this.game = game;
    this.ctx = this.game.ctx;
    this.seed = seed;
    this.cells = cells;
    this.turn = 0;

    this.state = [];
    this.nextState = [];

    this.init();
}

Board.prototype.init = function () {
    for(var i = 0; i < this.cells; i++) {
        for(var j = 0; j < this.cells; j++) {
            this.addCell(i, j);
        }
    }

    //initialize any given seed to the game
    this.setSeed();
    this.draw();
}

Board.prototype.addCell = function (x, y) {
    this.state.push({x: x, y: y, alive: false});
    this.nextState.push({x: x, y: y, alive: false});
}

Board.prototype.setSeed = function () {
    switch (this.seed) {
        case '':
            break;
        case 'block': 
            var anchorX = 1;
            var anchorY = 1;
            for(var i = 0; i < this.state.length; i++) {
                if(this.state[i].x === anchorX) {
                    if(this.state[i].y === anchorY) {
                        this.nextState[i].alive = true;
                    }
                    if(this.state[i].y === anchorY + 1) {
                        this.nextState[i].alive = true;
                    }

                }
                if(this.state[i].x === anchorX + 1) {
                    if(this.state[i].y === anchorY) {
                        this.nextState[i].alive = true;
                    }
                    if(this.state[i].y === anchorY + 1) {
                        this.nextState[i].alive = true;
                    } 
                }      
            }
            break;
        case 'blinker':
            var anchorX = 2;
            var anchorY = 2;
            //console.log("anchor: " + anchorX + " " + anchorY);
            for(var i = 0; i < this.state.length; i++) {
                if(this.state[i].x === anchorX) {
                    if(this.state[i].y === anchorY - 1) {
                        this.nextState[i].alive = true;
                        //console.log(this.nextState[i]);
                    }
                    if(this.state[i].y === anchorY) {
                        this.nextState[i].alive = true;
                        //console.log(this.nextState[i]);
                    }
                    if(this.state[i].y === anchorY + 1) {
                        this.nextState[i].alive = true;
                        //console.log(this.nextState[i]);
                    }
                }
                //console.log(this.cells[i]);
            }
            break;
        case 'glider':
            var anchorX = 2;
            var anchorY = 2;
            for(var i = 0; i < this.state.length; i++)  {
                if(this.state[i].x === anchorX - 1) {
                    if(this.state[i].y === anchorY + 1) {
                        this.nextState[i].alive = true;
                    }

                }
                if(this.state[i].x === anchorX) {
                    if(this.state[i].y === anchorY - 1) {
                        this.nextState[i].alive = true;
                    }
                    if(this.state[i].y === anchorY + 1) {
                        this.nextState[i].alive = true;
                    }

                }
                if(this.state[i].x === anchorX + 1) {
                    if(this.state[i].y === anchorY) {
                        this.nextState[i].alive = true;
                    }
                    if(this.state[i].y === anchorY + 1) {
                        this.nextState[i].alive = true;
                    }

                }
            }
            break;
    }
}

Board.prototype.checkMyNeighbors = function (cell) {
    //console.log("check my neighbors");
    //console.log("check cell: ");
    var living = 0;
    //console.log(cell);
    var me = cell;
    //console.log(me);
    for(var i = 0; i < this.state.length; i++) {
        var them = this.state[i];
        if(me !== them) {
            //console.log("me");
            //console.log(me);
            //console.log("them");
            //console.log(this.state[i]);
            if(me.x > 0 && them.x === me.x - 1) { 
                if(me.y > 0 && them.y === me.y - 1) {
                    //console.log("neighbor");
                    if(them.alive) {
                        //console.log("found alive");
                        living++;
                    }
                }

                if(them.y === me.y) {
                    //console.log("neighbor");
                    if(them.alive) {
                        //console.log("found alive");
                        living++;
                    }
                }

                if(me.y < this.cells - 1 && them.y === me.y + 1) {
                    //console.log("neighbor");
                    if(them.alive) {
                        //console.log("found alive");
                        living++;
                    }
                }
            }

            if(them.x === me.x) {
                if(me.y > 0 && them.y === me.y - 1) {
                    //console.log("neighbor");
                    if(them.alive) {
                        //console.log("found alive");
                        living++;
                    }
                }

                //missing this cell - is me

                if(me.y < this.cells - 1 && them.y === me.y + 1) {
                    //console.log("neighbor");
                    if(them.alive) {
                        //console.log("found alive");
                        living++;
                    }
                }
            }

            if(me.x < this.cells - 1 && them.x === me.x + 1) {
                if(me.y > 0 && them.y=== me.y - 1) {
                    //console.log("neighbor");
                    if(them.alive) {
                        //console.log("found alive");
                        living++;
                    }
                }

                if(them.y === me.y) {
                    //console.log("neighbor");
                    if(them.alive) {
                        //console.log("found alive");
                        living++;
                    }
                }

                if(me.y < this.cells - 1 && them.y === me.y + 1) {
                    //console.log("neighbor");
                    if(them.alive) {
                        //console.log("found alive");
                        living++;
                    }
                }   
            }
        }
    }

    //console.log("living: " + living);
    return living;
}

Board.prototype.update = function () {
    //console.log("board update");
    this.turn++;
    console.log(this.turn);
    var living = 0;

    /*console.log("update top");
    console.log("state");
    for(var i = 0; i <  this.cells * this.cells; i++) {
        console.log(this.state[i]);
    }

    console.log("nextState");
    for(var i = 0; i <  this.cells * this.cells; i++) {
        console.log(this.nextState[i]);
    }*/

    for(var i = 0; i < this.state.length; i++) {
        var cell = this.state[i];
        //console.log(cell);
        living = this.checkMyNeighbors(cell);
        if((living === 0 || living === 1) && cell.alive) {
            //console.log("living check 1: " + living);
            this.nextState[i].alive = false;
        }   
        if(living === 2 && cell.alive) {
            //console.log("living check 2: " + living);
            this.nextState[i].alive = true;
            //this.borders();
        }   
        if(living === 3) {
            //console.log("living check 3: " + living);
            this.nextState[i].alive = true;
            //this.borders();
        }
        if(living > 3) {
            //console.log("living check 4: " + living);
            this.nextState[i].alive = false;
        }
    }

    /*console.log("update bottom");
    console.log("state");
    for(var i = 0; i <  this.cells * this.cells; i++) {
        console.log(this.state[i]);
    }

    console.log("nextState");
    for(var i = 0; i <  this.cells * this.cells; i++) {
        console.log(this.nextState[i]);
    }*/
    this.draw();
}

Board.prototype.draw = function () {
    //console.log("drawing");
    var width = this.game.ctx.canvas.width / this.cells;
    for(var i = 0; i < this.nextState.length; i++) {
        if(this.nextState[i].alive) {
            this.ctx.fillStyle = 'Black';
        } else {
            this.ctx.fillStyle = 'Red';
        }

        this.ctx.fillRect(this.nextState[i].x * width, this.nextState[i].y * width, this.game.ctx.canvas.width/this.cells, this.game.ctx.canvas.height/this.cells);
    }

    /*console.log("state");
    for(var i = 0; i <  this.cells * this.cells; i++) {
        console.log(this.state[i]);
    }

    console.log("nextState - was drawn");
    for(var i = 0; i <  this.cells * this.cells; i++) {
        console.log(this.nextState[i]);
    }*/

    //console.log("handoff");
   //this.state = this.nextState;
    for(var i = 0; i < this.nextState.length; i++) {
        //console.log("i: " + i);
        //console.log(this.state[i]);
        //console.log(this.nextState[i]);
        this.state[i].alive = this.nextState[i].alive;
        this.nextState[i].alive = false; 
    }

    /*console.log("state");
    for(var i = 0; i <  this.cells * this.cells; i++) {
        console.log(this.state[i]);
    }

    console.log("nextState - should be blank");
    for(var i = 0; i <  this.cells * this.cells; i++) {
        console.log(this.nextState[i]);
    }*/    
} 

var AM = new AssetManager();
AM.queueDownload("./images/Link3.png");

AM.downloadAll(function () {
    var canvas = document.getElementById("gameWorld");
    var ctx = canvas.getContext("2d");

    var gameEngine = new GameEngine();
    gameEngine.init(ctx);

    // <script type="text/javascript" src="http://24.16.255.56:8888/socket.io/socket.io.js"></script>
    window.onload = function () {
        //var socket = io.connect("24.16.255.56:8888");
    
        /*socket.on("load", function (data) {
            console.log(data);
        });*/
    
        var text = document.getElementById("text");
        var saveButton = document.getElementById("save");
        var loadButton = document.getElementById("load");
        var blockButton = document.getElementById("Block");
        var blinkerButton = document.getElementById("Blinker");
        var gliderButton = document.getElementById("Glider");
    
        //Needs to save the board state, doesn't need neighbors, that can be rebuilt.
        saveButton.onclick = function () {
            console.log("save");
            text.innerHTML = "Saved."
            //socket.emit("save", { studentname: "Shannon Weston", statename: "aState", data: ""});
        };
    
        loadButton.onclick = function () {
            console.log("load");
            text.innerHTML = "Loaded."
            //socket.emit("load", { studentname: "Shannon Weston", statename: "aState" });
        };
    
        blockButton.onclick = function () {
            gameEngine.addEntity(new Board(gameEngine, 'block', 4));
        }

        blinkerButton.onclick = function () {
            gameEngine.addEntity(new Board(gameEngine, 'blinker', 5));
        }

        gliderButton.onclick = function () {
            gameEngine.addEntity(new Board(gameEngine, 'glider', 25));
        }
    };

    //gameEngine.addEntity(new Board(gameEngine, 'blinker', 5));
    //gameEngine.addEntity(new Board(gameEngine, 'block', 4));
    //gameEngine.addEntity(new Board(gameEngine, 'glider', 25));


    gameEngine.start();
    console.log("All Done!");
});