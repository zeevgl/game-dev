class Enemy extends Actor {
  constructor(name, gameWidth, gameHeight, x, y) {
    //randome number between 70 and 100
    const width = Math.floor(Math.random() * (100 - 50 + 1)) + 50;
    const height = Math.floor(Math.random() * (110 - 60 + 1)) + 60;

    super(name, x, y, width, height, gameWidth, gameHeight, 1, 5);
    this.gameWidth = gameWidth;
    this.gameHeight = gameHeight;

    this.speedV = new Vector([0, 0]);
    this.accV = new Vector([0, 0]);

    this.preperingToJump = false;
    this.additionalJumpingSpeed = 0;
    this.maxAdditionalJumpingSpeed = 1;

    this.color = `rgb(${Math.floor(Math.random() * 255)}, ${Math.floor(
      Math.random() * 255
    )}, ${Math.floor(Math.random() * 255)})`;
  }

  update(deltaTime, timestamp) {
    this.calcPosition();
  }

  draw(context) {
    this.drawRect(context);
    DEBUG_MODE && this.drawCollisionBox(context);
  }

  drawRect(context) {
    context.fillStyle = this.color;
    context.fillRect(this.x, this.y, this.width, this.height);
  }
}
