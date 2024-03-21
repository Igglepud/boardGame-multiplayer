
let multiplayerScene = new Phaser.Scene("Multiplayer");

multiplayerScene.init = function () {
  scene = this;
};
//load the plugin
multiplayerScene.preload = function () {
  this.load.scenePlugin({
    key: "rexboardplugin",
    url: "lib/rexboardplugin.js",
    sceneKey: "rexBoard",
  });
};
// create after game
multiplayerScene.create = function () {
    socket = io(":3031");

    socket.on('connection', function (data) { 

alert('poop scoop')

    },this)

  //create the board and configure it
  this.board = scene.rexBoard.add.board({
    grid: {
      gridType: "quadGrid",
      x: 50,
      y: 50,
      cellWidth: 100,
      cellHeight: 100,
      staggeraxis: "x", // 'x'|'y'
      staggerindex: "odd", // 'odd'|'even'
    },
    width: 16,
    height: 9,
    wrap: false,
    infinity: false,
  });
  //create visible board tiles
  this.board.forEachTileXY(function (tileXY, board) {
    if (tileXY.x == 0 || tileXY.y == 0 || tileXY.x == 15 || tileXY.y == 8) {
      let boardTile = scene.rexBoard.add
        .shape(board, tileXY.x, tileXY.y, 0, Phaser.Math.Between(0x000000, 0xffffff), 1)
        .setStrokeStyle(5, 0xffffff, 1)
        
    }
  }, this);

  //create player pieces and add them to the board
  //give them different Z values to avoid board knockout
  this.player1 = new Player(0, 0, this);
  this.board.addChess(this.player1, true);
  this.board.moveChess(this.player1, 0, 0, 1);
  this.player2 = new Player(0, 0, this);
  this.board.addChess(this.player2, true);
  this.board.moveChess(this.player2, 0, 0, 2);
  //create the "spinner"
  this.spinner = new Spinner(400, 400, this);

  this.turn = 1;
  this.player1.gameID = 1;
  this.player2.gameID = 2;

  //click event that runs the game
};

multiplayerScene.update = function () {};

//teleportPlayer(this.player1, 7, 8, this);
multiplayerScene.teleportPlayer = function (
  player,
  destinationX,
  destinationY,
  scene
) {
  let destination = scene.board.tileXYToWorldXY(destinationX, destinationY);

  player.tween = scene.tweens.add({
    targets: player,
    x: destination.x,
    y: destination.y,
    duration: 2000,
    callbackScope: this,
    callback: function () {
      scene.board.moveChess(player, destinationX, destinationY, this.turn);
    },
  });
};

multiplayerScene.movePlayer = function (spin) {
  //with 0 repeats remaining, move a player

  let playerMover = scene.time.addEvent({
    callbackScope: this,
    repeat: -1,
    delay: 500,
    callback: function () {
      //determine who's turn it is and move them
      //one square at a time
      let pieces = this.board.getAllChess();

      for (let i = 0; i < pieces.length; i++) {
        if (pieces[i].gameID == this.turn) {
          let tileXY = this.board.chessToTileXYZ(pieces[i]);

          if (tileXY.x < 15 && tileXY.y == 0) {
            this.board.moveChess(pieces[i], tileXY.x + 1, tileXY.y, i);
            spin--;
          } else if (tileXY.x == 15 && tileXY.y < 8) {
            this.board.moveChess(pieces[i], tileXY.x, tileXY.y + 1, i);
            spin--;
          } else if (tileXY.y == 8 && tileXY.x > 0) {
            this.board.moveChess(pieces[i], tileXY.x - 1, tileXY.y, i);
            spin--;
          } else if (tileXY.x == 0 && tileXY.y > 0) {
            this.board.moveChess(pieces[i], tileXY.x, tileXY.y - 1, i);
            spin--;

            if (tileXY.x == 0 && tileXY.y == 1) {
              if (this.turn == 1) {
                alert("Player 1 wins!");
              } else {
                alert("Player 2 wins!");
              }
              this.scene.restart();
            }
          }
        }
      }
      //end turn when all moves used
      if (spin == 0) {
        if (this.turn == 1) {
          this.turn = 2;
        } else {
          this.turn = 1;
        }
        this.spinner.spinner.setInteractive();
        playerMover.destroy();
      }
    },
  });
};
