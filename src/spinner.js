class Spinner extends Phaser.GameObjects.Container {
  constructor(x = 0, y = 0) {
    super(scene, x, y);
    scene.add.existing(this);
    this.spinner = scene.add.circle(0, 0, 200, 0xffff00);
    this.spinnerText = scene.add.text(
      this.spinner.x - 50,
      this.spinner.y - 50,
      "0",

      { fontSize: "144px" }
    );

    this.spinnerText.setTint(0x000000);

    this.spinner.setInteractive();
    //click event that runs the game
    this.spinner.on(
      "pointerdown",
      function () {
        this.spin();
      },
      this
    );
    this.add(this.spinner);
    this.add(this.spinnerText);
    this.setPosition(800,450)
  }

  spin() {
    this.spinner.disableInteractive();

    //create random spin numbers
    let spinTimer = scene.time.addEvent({
      callbackScope: this,
      repeat: 30,
      delay: 50,
      callback: function () {
        let spin = Phaser.Math.Between(1, 6);
        this.spinnerText.setText(spin);

        if (spinTimer.repeatCount == 0) {
          scene.movePlayer(spin);
        }
      },
    });
  }
}
