let titleScene = new Phaser.Scene("Title");

titleScene.init = function () {};

titleScene.title = function () {};
// create after title
titleScene.create = function () {
  this.titleText = this.add.text(800, 500, "ONE LAP", {
    fontSize: "100px",
    fill: "#ffff00",
  });

  this.titleText.setPosition(
    this.titleText.x - this.titleText.width / 2,
    this.titleText.y - this.titleText.height / 2
    
  );

  this.singlePlayer = this.add.text(this.titleText.x - this.titleText.width / 2, this.titleText.y + 100, "SINGLE PLAYER", {
    fontSize: "75px",
    fill: "#00ffff",
  }).setVisible(false);

  this.singlePlayer.setInteractive();
  this.singlePlayer.on("pointerdown", function () {
    this.scene.start("Game");
  }, this);

  this.multiPlayer = this.add.text(this.titleText.x - this.titleText.width / 2, this.titleText.y + 200, "MULTIPLAYER", {
    fontSize: "75px",
    fill: "#ff00ff",
  }).setVisible(false);

  this.multiPlayer.setInteractive();
  this.multiPlayer.on("pointerdown", function () {
    this.scene.start("Multiplayer");
  }, this);


  this.time.addEvent({
    delay: 2000,
    callback: function () {

      this.titleText.setText('SELECT AN OPTION')
      this.titleText.setPosition(
        800 - this.titleText.width / 2,
        this.titleText.y - this.titleText.height / 2
      )
      this.singlePlayer.setPosition(
        this.titleText.x + this.titleText.width / 2-this.singlePlayer.width / 2,
        this.titleText.y + 125
      )
      this.multiPlayer.setPosition(
        this.titleText.x + this.titleText.width / 2-this.multiPlayer.width / 2,
        this.titleText.y + 225
      )

      this.singlePlayer.setVisible(true);
      this.multiPlayer.setVisible(true);

    },
    callbackScope: this,
  });
  

  // this.scene.start("Game");
};
//make everything actually happen
titleScene.update = function () {};
