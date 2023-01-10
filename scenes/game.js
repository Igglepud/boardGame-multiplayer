let gameScene = new Phaser.Scene("Game");

gameScene.init = function () {};

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
  this.board = scene.rexBoard.add.board({
    grid: {
      // gridType: "hexagonGrid",
      x: 0,
      y: 0,
      cellWidth: 30,
      cellHeight: 30,
      staggeraxis: "x", // 'x'|'y'
      staggerindex: "odd", // 'odd'|'even'
    },
    width: 40,
    height: 40,
    wrap: false,
    infinity: false,
  });

  this.board.forEachTileXY(function (tileXY, board) {
    let colorNumber = Phaser.Math.Between(1, 2);
    let gameNumber = 0;

    if (colorNumber == 1) {
      colorNumber = 0x000000;
      gameNumber = 0;
    } else {
      colorNumber = 0xffffff;
      gameNumber = 1;
    }

    var chess = scene.rexBoard.add.shape(
      board,
      tileXY.x,
      tileXY.y,
      0,
      colorNumber,
      0.7
    );
    chess.gameNumber = gameNumber;
  });
  this.gameLooper = this.time.addEvent({
    delay: 100,
    repeat: -1,
    callback: function () {
      let oldArray = this.board.getAllChess();
      let newArray = [];
      for (let i = 0; i < oldArray.length; i++) {
        let status = 0;
        let neighbors = this.board.getNeighborChess(oldArray[i], null);
        for (let j = 0; j < neighbors.length; j++) {
          status += neighbors[j].gameNumber;
        }
        if ((status == 2 || status == 3) && oldArray[i].gameNumber == 1) {
          newArray[i] = "living";
        } else if (status == 3 && oldArray[i].gameNumber == 0) {
          newArray[i] = "living";
        } else {
          newArray[i] = "dead";
        }
      }
      for (let i = 0; i < oldArray.length; i++) {
        if (newArray[i] == "living") {
          oldArray[i].fillColor = 0xfdf851;
          oldArray[i].gameNumber = 1;
        } else {
          oldArray[i].fillColor = 0x9a3599;
          oldArray[i].gameNumber = 0;
        }
      }
    },
    callbackScope: this,
  });
};
//make everything actually happen
gameScene.update = function () {};
