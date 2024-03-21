class Player extends Phaser.GameObjects.Container {
  constructor(x = 0, y = 0) {
    super(scene, x, y);
    this.circle = scene.add.circle(0, 0, 50, Phaser.Math.Between(0, 0xffffff));
    this.circle.setStrokeStyle(5, Phaser.Math.Between(0, 0xffffff));
      this.add(this.circle);
      scene.add.existing(this);
      
  }
}
