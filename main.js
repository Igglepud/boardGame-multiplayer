// set game configuration
var isMobile = navigator.userAgent.indexOf("Mobile");
var w = 1600;
var h = 1600;

window.onload = function () {
  if (isMobile == -1) {
    isMobile = navigator.userAgent.indexOf("Tablet");
  }

  if (isMobile != -1) {
    w = window.innerWidth;
    h = window.innerHeight;
  }
};

let config = {
  type: Phaser.WEBGL,
  fullscreenTarget: "phaser-app",
  width: w,
  height: h,
  scene: [preloadScene, titleScene, gameScene,multiplayerScene],
  pixelArt: false,
  scale: {
    parent: "phaser-example",
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    width: w,
    height: h,
  },

  backgroundColor: 0x0c23a7,
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 1000 },
      //debug: true,
    },
  },
};

//create new game and send configuration

let game = new Phaser.Game(config);
