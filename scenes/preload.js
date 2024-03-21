let preloadScene = new Phaser.Scene("Preload");

preloadScene.init = function () {};

preloadScene.preload = function () {};
// create after preload
preloadScene.create = function () {
  this.scene.start("Title");
};
//make everything actually happen
preloadScene.update = function () {};
