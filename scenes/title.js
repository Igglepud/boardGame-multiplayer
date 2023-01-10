let titleScene = new Phaser.Scene("Title");

titleScene.init = function () {};

titleScene.title = function () {};
// create after title
titleScene.create = function () {
  this.scene.start("Game");
};
//make everything actually happen
titleScene.update = function () {};
