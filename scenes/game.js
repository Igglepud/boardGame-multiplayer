let gameScene = new Phaser.Scene("Game");

gameScene.init = function () {};
//load the plugin
gameScene.preload = function () {
  this.load.scenePlugin({
    key: "rexboardplugin",
    url: "lib/rexboardplugin.js",
    sceneKey: "rexBoard",
  });
};
// create after game
gameScene.create = function () {
  const scene = this;
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
        .shape(board, tileXY.x, tileXY.y, 0, 0xff0000, 1)
        .setStrokeStyle(5, 0xffffff, 1);
    }
  }, this);

  //create player pieces and add them to the board
  //give them different Z values to avoid board knockout
  this.player1 = this.add.circle(0, 0, 50, 0xffff00);
  this.board.addChess(this.player1, true);
  this.board.moveChess(this.player1, 0, 0, 1);
  this.player2 = this.add.circle(0, 0, 50, 0xff00ff);
  this.board.addChess(this.player2, true);
  this.board.moveChess(this.player2, 0, 0, 2);
  //create the "spinner"
  this.spinner = this.add.circle(800, 500, 200, 0xffff00);
  this.spinnerText = this.add.text(
    this.spinner.x - 50,
    this.spinner.y - 50,
    "0",

    { fontSize: "144px" }
  );

  this.spinnerText.setTint(0x000000);

  this.turn = 1;
  this.player1.gameID = 1;
  this.player2.gameID = 2;

  this.spinner.setInteractive();
  //click event that runs the game
  this.spinner.on(
    "pointerdown",
    function () {
      this.spinner.disableInteractive();
      let spin = Phaser.Math.Between(1, 6);

      //create random spin numbers
      let spinTimer = this.time.addEvent({
        callbackScope: this,
        repeat: 30,
        delay: 50,
        callback: function () {
          spin = Phaser.Math.Between(1, 6);
          this.spinnerText.setText(spin);
          //with 0 repeats remaining, move a player
          if (spinTimer.repeatCount == 0) {
            let playerMover = this.time.addEvent({
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
                      this.board.moveChess(
                        pieces[i],
                        tileXY.x + 1,
                        tileXY.y,
                        i
                      );
                      spin--;
                    } else if (tileXY.x == 15 && tileXY.y < 8) {
                      this.board.moveChess(
                        pieces[i],
                        tileXY.x,
                        tileXY.y + 1,
                        i
                      );
                      spin--;
                    } else if (tileXY.y == 8 && tileXY.x > 0) {
                      this.board.moveChess(
                        pieces[i],
                        tileXY.x - 1,
                        tileXY.y,
                        i
                      );
                      spin--;
                    } else if (tileXY.x == 0 && tileXY.y > 0) {
                      this.board.moveChess(
                        pieces[i],
                        tileXY.x,
                        tileXY.y - 1,
                        i
                      );
                      spin--;
       
                      if(tileXY.x==0&&tileXY.y==1){
                        if(this.turn==1){alert('Player 1 wins!')}
                        else{alert('Player 2 wins!')}
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
                  this.spinner.setInteractive();
                  playerMover.destroy();
                }




              },
            });
          }
        },
      });
    },
    this
  );
};

gameScene.update = function () {};
