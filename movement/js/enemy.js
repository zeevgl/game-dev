class Enemy extends Actor {
  constructor(name, gameWidth, gameHeight) {
    const size = PLAYER_SIZE;

    super(name, 0, 0, size, size, gameWidth, gameHeight);
    this.gameWidth = gameWidth;
    this.gameHeight = gameHeight;

    this.speedV = new Vector([1, 0]);
    this.accV = new Vector([0, 0]);

    this.size = size;

    this.preperingToJump = false;
    this.additionalJumpingSpeed = 0;
    this.maxAdditionalJumpingSpeed = 1;
  }

  update(deltaTime, timestamp) {
    this.calcPosition();
  }

  draw(context) {
    this.drawRect(context)
  }

  drawRect(context) {
    context.fillStyle = '#ff00ff';
    context.fillRect(this.x, this.y, 50, 150);
  }
}
